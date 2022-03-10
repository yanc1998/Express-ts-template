import {Service} from "typedi";
import {UserService} from "../../Users/services/UserService";
import {encode} from 'jwt-simple'

import {payload} from "../dto/payload";
import {User} from "../../Users/models/User.entity";
import {RegisterUserDto} from "../dto/registerDto";
import {Result} from "../../base/core/ddd-base/core/result";
import {AppError} from "../../base/core/ddd-base/core/errors/app.error";
import bcrypt, {hash} from "bcrypt";
import {EmailService} from "../../email/service/emailService";
import {RedisService} from "../../base/configFiles/redisConfig";
import stringRandom from "string-random";
import {createUser} from "../../Users/services/createUser";


@Service()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly emailService: EmailService,
                private readonly redisService: RedisService) {

    }

    async login(user: User) {
        const payload: payload = {
            sub: user._id,
            exp: Date.now() + parseInt(process.env.JWT_LIFETIME || '24h'),
            email: user.email
        }

        const token = encode(payload, 'secret', "HS256");
        return {acces_token: token};
    }

    async Register(userDto: RegisterUserDto) {
        const userToCreate = {
            ...userDto,
            roles: ['SimpleUser']
        }

        const userByEmailOrError = await this.userService.getOne({
            email: userDto.email
        })
        //if the user exist
        if (userByEmailOrError.isSuccess) {
            if (userByEmailOrError.getValue().is_register) {
                return Result.Fail(new AppError.ValidationError('user email is take'))
            }
            if (!userByEmailOrError.getValue().is_register) {
                if (!await bcrypt.compare(userDto.password, userByEmailOrError.getValue().password)) {
                    return Result.Fail(new AppError.ValidationError('invalid password,user is create,waiting for' +
                        'confirm register,pleas enter correct password and email to send verification code'))
                }
                console.log("send mail register verification")
                const code = await this.get_code(userByEmailOrError.getValue()._id)
                console.log(code)
                const sendEmailOrError = await this.emailService.sendEmail(userDto.email, code, 'confirmation code')
                if (!sendEmailOrError.isSuccess) {
                    return Result.Fail(sendEmailOrError.getError())
                }
                return Result.Ok()
            }
        }


        console.log("pass")
        //
        console.log("pass2")
        const userOrError = await createUser(userToCreate, this.userService.userRepository, this.userService.rolesRepository)
        console.log("pass3")
        console.log(userOrError)
        if (userOrError.isSuccess) {
            //await this.userService.userRepository.startTransaction()
            const userOrErrorPersist = await this.userService.userRepository.add(userOrError.getValue())
            if (!userOrErrorPersist.isSuccess) {
                await this.userService.userRepository.discard()
                return userOrErrorPersist
            }
            console.log('send email with verification code')
            const code = await this.get_code(userOrError.getValue()._id)
            const sendEmailOrError = await this.emailService.sendEmail(userDto.email, code, 'confirmation code')
            if (!sendEmailOrError.isSuccess) {
                //await session.abortTransaction()
                await this.userService.userRepository.discard()
                return Result.Fail(sendEmailOrError.getError())
            }
            //await session.commitTransaction()
            //await session.endSession()
            await this.userService.userRepository.commit()
            return userOrError
        }
        //await session.abortTransaction()
        //await session.endSession()
        await this.userService.userRepository.discard()
        return userOrError
    }

    async ConfirmRegister(code: string) {
        console.log("confirm register")
        const client = await this.redisService.getClient()
        const hashcode = await hash(code, process.env.ROUNDCRYPT || 5)
        if (client.exists(hashcode)) {
            const userId_toConfirm = client.get(hashcode)
            const confirmOrError = await this.userService.update({is_register: true})
            if (!confirmOrError.isSuccess)
                return Result.Fail<User>(confirmOrError.getError())
            client.del(hashcode)
            return Result.Ok()
        }
        return Result.Fail(new AppError.ValidationError('invalid verification code'))
    }

    private async get_code(userId: string) {
        const code = stringRandom(6, {letters: false})
        const hashCode = await hash(code, process.env.ROUNDCRYPT || 5)
        const client = await this.redisService.getClient()
        while (await client.exists(hashCode)) {
            const code = stringRandom(6, {letters: false})
            const hashCode = await hash(code, process.env.ROUNDCRYPT || 5)
        }
        await client.set(hashCode, userId)
        await client.expire(hashCode, process.env.EXPIRE_TIME_CODE || 60 * 60 * 24)
        return code
    }

}
import {AppError} from "../../base/core/ddd-base/core/errors/app.error";
import {Result} from "../../base/core/ddd-base/core/result";
import {email as Email} from "../../base/core/value-objects/email";
import {Roles} from "../../Roles/models/Roles.entity";
import {RolesRepository} from "../../Roles/repositories/RolesRepository";
import {UserCrateDto} from "../dto/UserCreate.dto";
import {User} from "../models/User.entity";
import {UserRepository} from "../repositories/UserRepository";
import {userName} from "../valueObjects/userName";
import {userPassword} from "../valueObjects/userPassword";
import {v4 as uuid4} from 'uuid'
import bcrypt from 'bcrypt'

export async function createUser(createUserDto: UserCrateDto, userRepository: UserRepository, rolesRepository: RolesRepository): Promise<Result<User>> {
    const username = userName.create({name: createUserDto.username})
    const password = userPassword.create({password: createUserDto.password})
    const email = Email.create({email: createUserDto.email})

    const propsOrError = Result.combine([username, password, email])

    if (!propsOrError.isSuccess) {
        return Result.Fail<User>(new AppError.ValidationError(propsOrError.getError().message))
    }

    const roles: Result<Roles>[] = []
    for (const role of createUserDto.roles) {
        roles.push(await rolesRepository.getOneByfitler({name: role}))
    }
    const rolesOrError = Result.combine(roles)

    if (!rolesOrError.isSuccess) {
        return Result.Fail(new AppError.ValidationError('invalid roles'))
    }

    const existUser = await userRepository.getOneByfitler({email: createUserDto.email})

    if (existUser.isSuccess) {
        return Result.Fail(new AppError.ValidationError('user alredy exist'))
    }


    const rolesIds: string[] = roles.map(x => x.getValue()._id)
    console.log(rolesIds)
    const hasPassword = await bcrypt.hash(createUserDto.password, 10)

    const userToPersist = {
        _id: uuid4(),
        createAt: new Date(),
        username: createUserDto.username,
        password: hasPassword,
        email: createUserDto.email,
        roles: rolesIds,
    } as User


    return Result.Ok(userToPersist)
}
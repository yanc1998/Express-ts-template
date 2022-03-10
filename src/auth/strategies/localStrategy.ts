import { PassportStatic } from 'passport'
import { Strategy } from 'passport-local'
import { UserService } from '../../Users/services/UserService';
import bcrypt from 'bcrypt'
import { AppError } from '../../base/core/ddd-base/core/errors/app.error';
import { Service } from 'typedi';

@Service()
export class LocalStrategy {

    constructor(private readonly userService: UserService) {
    }

    validate(passport: PassportStatic) {
        passport.use(new Strategy({
            usernameField: "email",
            passwordField: "password",
            session: false
        }, async (email, password, done) => {
            const userOrError = await this.userService.getOne({ email: email });
            console.log(userOrError.getValue())
            if (!userOrError.isSuccess) {
                return done(userOrError.getError(), false);
            }
            if (!bcrypt.compareSync(password, userOrError.getValue().password)) {
                return done(new AppError.ValidationError('wrong password'), false);
            }
            //if (!userOrError.getValue().is_register) {
            //    return done(new AppError.ValidationError('user not register'), false)
            //}
            return done(null, userOrError.getValue());
        }
        ));
    }

}
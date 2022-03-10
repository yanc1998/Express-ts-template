import { AppError } from "../../base/core/ddd-base/core/errors/app.error";
import { Guard } from "../../base/core/ddd-base/core/guards";
import { Result } from "../../base/core/ddd-base/core/result";
import { ValueObject } from "../../base/core/ddd-base/domain/value-object.abstract";

type userPasswordProps = {
    password: string
}

export class userPassword extends ValueObject<userPasswordProps>{

    static create(userPasswordProps: userPasswordProps): Result<userPassword> {

        const passwordLengthMin = Guard.againstAtLeast({ argumentPath: 'password', numChars: 5, argument: userPasswordProps.password })
        const passwordLengthMax = Guard.againstAtMost({ argumentPath: 'password', numChars: 20, argument: userPasswordProps.password })
        const upercasePassword = Guard.containUperCase(userPasswordProps.password, 'password')


        if (!passwordLengthMin.succeeded) {
            return Result.Fail<userPassword>(new AppError.ValidationError(passwordLengthMin.message))
        }

        if (!passwordLengthMax.succeeded) {
            return Result.Fail<userPassword>(new AppError.ValidationError(passwordLengthMax.message))
        }

        if (!upercasePassword.succeeded) {
            return Result.Fail<userPassword>(new AppError.ValidationError(upercasePassword.message))
        }

        return Result.Ok(new userPassword(userPasswordProps))
    }
}
import { AppError } from "../../base/core/ddd-base/core/errors/app.error";
import { Guard } from "../../base/core/ddd-base/core/guards";
import { Result } from "../../base/core/ddd-base/core/result";
import { ValueObject } from "../../base/core/ddd-base/domain/value-object.abstract";

type userNameProps = {
    name: string
}

export class userName extends ValueObject<userNameProps>{

    static create(userNameProps: userNameProps): Result<userName> {
        const userLengthMin = Guard.againstAtLeast({ argumentPath: 'user name', numChars: 5, argument: userNameProps.name })
        const userLengthMax = Guard.againstAtMost({ argumentPath: 'user name', numChars: 20, argument: userNameProps.name })
        const upercaseName = Guard.containUperCase(userNameProps.name, 'user name')


        if (!userLengthMin.succeeded) {
            return Result.Fail<userName>(new AppError.ValidationError(userLengthMin.message))
        }

        if (!userLengthMax.succeeded) {
            return Result.Fail<userName>(new AppError.ValidationError(userLengthMax.message))
        }

        if (!upercaseName.succeeded) {
            return Result.Fail<userName>(new AppError.ValidationError(upercaseName.message))
        }

        return Result.Ok(new userName(userNameProps))
    }
}
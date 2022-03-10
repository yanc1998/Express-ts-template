import { AppError } from "../ddd-base/core/errors/app.error"
import { Guard } from "../ddd-base/core/guards"
import { Result } from "../ddd-base/core/result"
import { ValueObject } from "../ddd-base/domain/value-object.abstract"


type emailProps = {
    email: string
}

export class email extends ValueObject<emailProps>{

    static create(emailProps: emailProps): Result<email> {

        //check valid email
        const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!valid.test(emailProps.email))
            Result.Fail(new AppError.ValidationError('invalid email'))

        return Result.Ok(new email(emailProps))
    }
}
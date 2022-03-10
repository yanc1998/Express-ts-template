import { AppError } from "../../base/core/ddd-base/core/errors/app.error";
import { Guard } from "../../base/core/ddd-base/core/guards";
import { Result } from "../../base/core/ddd-base/core/result";
import { ValueObject } from "../../base/core/ddd-base/domain/value-object.abstract";

type rolesNameProps = {
    name: string
}

export class rolesName extends ValueObject<rolesNameProps>{

    static create(rolesNameProps: rolesNameProps): Result<rolesName> {
        const rolesNameResult = Guard.againstAtLeast({ argumentPath: 'roles name', numChars: 5, argument: rolesNameProps.name })
        if (!rolesNameResult.succeeded) {
            return Result.Fail(new AppError.ValidationError(rolesNameResult.message))
        }

        return Result.Ok(new rolesName(rolesNameProps))
    }
}
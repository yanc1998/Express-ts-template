import { AppError } from "../../base/core/ddd-base/core/errors/app.error";
import { PageParams } from "../../base/core/ddd-base/core/PaginatorParams";
import { Result } from "../../base/core/ddd-base/core/result";
import { PaginateIn } from "../../base/core/dto/INPUT/PaginateIn";
import { PaginateOut } from "../../base/core/dto/OUTPUT/PaginateOut";
import { User } from "../models/User.entity";
import { UserRepository } from "../repositories/UserRepository";

export async function paginateUser(paginateDto: PaginateIn, filter: {}, userRepository: UserRepository) {

    const paginateOrError = PageParams.create({ pageLimit: paginateDto.limit, pageNum: paginateDto.page })
    if (!paginateOrError.isSuccess) {
        return Result.Fail<PaginateOut<User>>(new AppError.ValidationError(paginateOrError.getError().message))
    }

    return await userRepository.paginate(paginateOrError.getValue(), filter, 'roles')
}
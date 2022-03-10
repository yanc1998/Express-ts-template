import {CreateRoleDto} from "../dto/createRole.dto";
import {RolesRepository} from "../repositories/RolesRepository";
import {v4 as uuid4} from 'uuid'
import {Result} from "../../base/core/ddd-base/core/result";
import {AppError} from "../../base/core/ddd-base/core/errors/app.error";
import {Roles} from "../models/Roles.entity";
import {rolesName} from "../valueObjects/rolesName.valueObject";

export async function createRole(dto: CreateRoleDto, roleRepository: RolesRepository) {
    //poner las validaciones de los value-object de name 

    const nameOrError = rolesName.create(dto)

    if (!nameOrError.isSuccess) {
        return Result.Fail<Roles>(nameOrError.getError())
    }

    const roleOrError = await roleRepository.getByfitler({name: dto.name})

    if (roleOrError.isSuccess) {
        return Result.Fail<Roles>(new AppError.DuplicateRoleError('alredy exist role'))
    }
    if (!roleOrError.isSuccess && typeof roleOrError.getError() == typeof AppError.UnexpectedError) {
        return Result.Fail<Roles>(roleOrError.getError())
    }


    return await roleRepository.add(
        {
            name: nameOrError.unwrap()['props'].name,
            _id: uuid4(),
            createAt: new Date(),

        } as any)
}
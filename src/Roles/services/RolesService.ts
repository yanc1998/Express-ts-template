import {Service} from "typedi";
import {IResultError} from "../../base/core/ddd-base/core/interfaces/IResultError";
import {Result} from "../../base/core/ddd-base/core/result";
import {PaginateIn} from "../../base/core/dto/INPUT/PaginateIn";
import {PaginateOut} from "../../base/core/dto/OUTPUT/PaginateOut";
import {IService} from "../../base/core/interfaces/IService";
import {CreateRoleDto} from "../dto/createRole.dto";
import {Roles} from "../models/Roles.entity";
import {RolesRepository} from "../repositories/RolesRepository";
import {createRole} from "./createRole";
import {ClientSession} from "mongoose";

@Service()
export class RoleService implements IService<Roles> {
    roleRepository: RolesRepository

    constructor(_roleRepository: RolesRepository) {
        this.roleRepository = _roleRepository
    }


    paginate(paginateDto: PaginateIn, filter: {}): Promise<Result<PaginateOut<Roles>, IResultError>> {
        throw new Error("Method not implemented.");
    }

    async delete(filter: {}): Promise<Result<void>> {
        return this.roleRepository.delete(filter)
    }

    async update(...param: any[]): Promise<Result<Roles>> {
        throw new Error("Method not implemented.");
    }

    async get(param: {}): Promise<Result<Roles[]>> {
        return await this.roleRepository.getByfitler(param)
    }

    async create(dto: CreateRoleDto) {

        return await createRole(dto, this.roleRepository)
    }

    async getSession(): Promise<ClientSession> {
        return await this.roleRepository.getSession()
    }
}
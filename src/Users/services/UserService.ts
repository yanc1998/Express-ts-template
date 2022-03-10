import {Service} from "typedi";
import {Result} from "../../base/core/ddd-base/core/result";
import {PaginateIn} from "../../base/core/dto/INPUT/PaginateIn";
import {IService} from "../../base/core/interfaces/IService";
import {RolesRepository} from "../../Roles/repositories/RolesRepository";
import {UserCrateDto} from "../dto/UserCreate.dto";
import {User} from "../models/User.entity";
import {UserRepository} from "../repositories/UserRepository";
import {createUser} from "./createUser";
import {getUsers} from "./getUsers";
import {paginateUser} from "./paginateUsers";
import {ClientSession} from "mongoose";

@Service()
export class UserService implements IService<User> {
    userRepository: UserRepository
    rolesRepository: RolesRepository

    constructor(_userRepository: UserRepository, _rolesRepository: RolesRepository) {
        this.userRepository = _userRepository
        this.rolesRepository = _rolesRepository
    }

    async delete(param: {}): Promise<Result<void>> {
        return await this.userRepository.delete(param)
    }

    async create(createUserDto: UserCrateDto): Promise<Result<User>> {
        const userOrError = await createUser(createUserDto, this.userRepository, this.rolesRepository)
        if (userOrError.isSuccess) {
            return await this.userRepository.add(userOrError.getValue())
        }
        return userOrError
    }

    async update(...param: any[]): Promise<Result<User>> {
        throw new Error("Method not implemented.");
    }

    async get(param: {}): Promise<Result<User[]>> {
        return await getUsers(param, this.userRepository)
    }

    async paginate(painateDto: PaginateIn, filter: {}) {
        return await paginateUser(painateDto, filter, this.userRepository)
    }

    async getOne(filter: {}) {
        return await this.userRepository.getOneByfitler(filter)
    }

}
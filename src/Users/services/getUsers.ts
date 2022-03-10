import { Result } from "../../base/core/ddd-base/core/result";
import { User } from "../models/User.entity";
import { UserRepository } from "../repositories/UserRepository";

export async function getUsers(filter: {}, userRepository: UserRepository): Promise<Result<User[]>> {
    return await userRepository.getByfitler(filter)
}
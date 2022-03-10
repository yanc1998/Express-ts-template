import { BaseRepository } from "../../base/core/repositories/baseRepository";
import { User } from "../models/User.entity";
import { getModelForClass } from '@typegoose/typegoose'
import { Service } from "typedi";

@Service()
export class UserRepository extends BaseRepository<User>{
    constructor() {
        super(getModelForClass(User));
    }
}
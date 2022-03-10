import { getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { Service } from "typedi";
import { BaseRepository } from "../../base/core/repositories/baseRepository";
import { Roles } from "../models/Roles.entity";

@Service()
export class RolesRepository extends BaseRepository<Roles>{
    constructor() {
        super(getModelForClass(Roles));
    }
}
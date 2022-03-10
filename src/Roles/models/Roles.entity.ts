import { prop, Ref } from "@typegoose/typegoose";
import { BaseEntity } from "../../base/core/entities/baseEntity";
import { User } from "../../Users/models/User.entity";

export class Roles extends BaseEntity {
    @prop({ required: true, unique: true })
    name: string
}
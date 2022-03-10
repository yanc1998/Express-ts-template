import { prop, Ref } from "@typegoose/typegoose";
import { BaseEntity } from "../../base/core/entities/baseEntity";
import { Roles } from "../../Roles/models/Roles.entity";

export class BaseUser extends BaseEntity {
    @prop({ required: true })
    username: string

    @prop({ required: true })
    email: string

    @prop({ required: true })
    password: string

    @prop({ default: false })
    is_register: boolean

    @prop({ ref: () => Roles, type: () => String })
    roles: Ref<Roles, string>[]

}

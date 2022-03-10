import { prop } from "@typegoose/typegoose"

export class BaseEntity {
    @prop({ required: true })
    _id: string

    @prop({ required: true })
    createAt: Date

    @prop({ required: false })
    updateAt: Date

    @prop({ required: false })
    deleteAt: Date
}
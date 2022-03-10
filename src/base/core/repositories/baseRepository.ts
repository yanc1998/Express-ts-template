import {ReturnModelType} from "@typegoose/typegoose";
import {AnyParamConstructor} from "@typegoose/typegoose/lib/types";
import {AppError} from "../ddd-base/core/errors/app.error";
import {PageParams} from "../ddd-base/core/PaginatorParams";
import {Result} from "../ddd-base/core/result";
import {PaginateOut} from "../dto/OUTPUT/PaginateOut";
import mongoose, {ClientSession} from "mongoose";
import option from "../ddd-base/core/option";


export class BaseRepository<T> {
    private readonly model: ReturnModelType<AnyParamConstructor<T>>;
    private session: ClientSession;

    constructor(_model: ReturnModelType<AnyParamConstructor<T>>) {
        this.model = _model

    }

    async startTransaction() {
        this.session = await mongoose.startSession()
        await this.session.startTransaction()
    }

    async commit() {
        await this.session.commitTransaction()
    }

    async discard() {
        await this.session.abortTransaction()
        await this.session.endSession()
    }

    async getSession(): Promise<ClientSession> {
        return await this.model.startSession()
    }

    async getbyId(id: string): Promise<Result<T>> {
        try {
            const data = await this.model.findById(id);
            if (!data)
                return Result.Fail(new AppError.NotFoundError(`${this.model.name} no found`))

            return Result.Ok(data)
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }
    }

    async getByfitler(filter: {}): Promise<Result<T[]>> {
        try {
            const data = await this.model.find(filter);
            if (data.length == 0)
                return Result.Fail(new AppError.NotFoundError(`${this.model.name} no found`))

            return Result.Ok(data)
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }
    }

    async getOneByfitler(filter: {}): Promise<Result<T>> {
        try {
            const data = await this.model.findOne(filter);
            if (!data)
                return Result.Fail(new AppError.NotFoundError(`${this.model.name} no found`))

            return Result.Ok(data)
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }
    }

    async add(model: T): Promise<Result<T>> {

        try {
            // HydratedDocument<DocumentType<T, BeAnObject>, {}, {}>
            console.log(this.session)
            const data = await this.model.create([model], {session: await this.model.startSession()});
            if (!data)
                return Result.Fail(new AppError.NotFoundError(`${this.model.name} not create`))
            return Result.Ok(data[0])
        } catch (error) {
            console.log("errpr")
            return Result.Fail(new AppError.UnexpectedError(error))
        }

    }


    async delete(filter: {}): Promise<Result<void>> {
        try {
            const deletes = await this.model.deleteMany(filter);
            return Result.Ok()
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }

    }

    async paginate(paginate: PageParams, _filter: {}, populates: string): Promise<Result<PaginateOut<T>>> {
        const page: number = paginate.pageNum;
        const limit: number = paginate.pageLimit;
        const filter = _filter;
        try {
            const items: T[] = await this.model.find(filter).skip((page - 1) * limit).limit(limit).populate('roles');
            const total: number = await this.model.countDocuments(filter)
            const pages = Math.ceil(total / limit);
            return Result.Ok({
                page: page,
                total: total,
                pages: pages,
                data: items
            })
        } catch (error) {
            return Result.Fail(new AppError.UnexpectedError(error))
        }
    }
}
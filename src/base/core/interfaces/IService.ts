import {IResultError} from "../ddd-base/core/interfaces/IResultError";
import {Result} from "../ddd-base/core/result";
import {PaginateIn} from "../dto/INPUT/PaginateIn";
import {PaginateOut} from "../dto/OUTPUT/PaginateOut";
import {ClientSession} from "mongoose";

export interface IService<T> {

    create(...param: any[]): Promise<Result<T>>;

    update(...param: any[]): Promise<Result<T>>;

    get(param: {}): Promise<Result<T[]>>;

    delete(param: {}): Promise<Result<void>>;

    paginate(paginateDto: PaginateIn, filter: {}): Promise<Result<PaginateOut<T>>>
}
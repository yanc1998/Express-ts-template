import {Request, Response} from "express";
import {IService} from "../core/interfaces/IService";
import {Result} from "../core/ddd-base/core/result";
import {PaginateOut} from "../core/dto/OUTPUT/PaginateOut";

/**
 * BaseRoute
 * 
 * @class BaseRoute
 */
export class BaseController<T> {
    protected service: IService<T>

    /**
     * Constructor
     * 
     * @class BaseController
     * @method constructor
     */
    constructor(_service: IService<T>) {
        this.service = _service
    }


    async Get(req: Request, res: Response): Promise<T[] | unknown> {
        const body = req.body
        const resultOrError: Result<T[]> = await this.service.get(body)
        if (resultOrError.isSuccess) {
            res.status(200)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }

    async Create(req: Request, res: Response): Promise<T | unknown> {
        const body = req.body
        const resultOrError: Result<T> = await this.service.create(body)
        if (resultOrError.isSuccess) {
            res.status(201)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }

    async Paginate(req: Request, res: Response): Promise<PaginateOut<T> | unknown> {
        const body = req.body.paginate
        const filter = req.body.filter
        const resultOrError: Result<PaginateOut<T>> = await this.service.paginate(body, filter)
        if (resultOrError.isSuccess) {
            res.status(201)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }

    async delete(req: Request, res: Response) {
        const filter = req.body.filter
        const resultOrError = await this.service.delete(filter)
        if (resultOrError.isSuccess) {
            res.status(201)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }

}


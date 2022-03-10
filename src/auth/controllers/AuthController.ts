import {Request, Response} from "express";
import {AuthService} from "../services/AuthService"
import {Service} from "typedi";

@Service()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    async Login(req: Request, res: Response) {
        const body = req.user as any
        res.status(200)
        return await this.authService.login(body)
    }

    async Register(req: Request, res: Response) {
        const body = req.body as any
        const resultOrError = await this.authService.Register(body)
        if (resultOrError.isSuccess) {
            res.status(201)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }

    async ConfirmRegister(req: Request, res: Response) {
        const body = req.body as any
        const resultOrError = await this.authService.ConfirmRegister(body.verification_code)
        if (resultOrError.isSuccess) {
            res.status(201)
            return resultOrError.getValue()
        }
        res.status(400)
        return {error: resultOrError.getError().pretty()}
    }
}
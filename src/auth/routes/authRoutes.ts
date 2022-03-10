import express, {Request, Response} from 'express'
import Container, {Service} from "typedi";
import {AuthController} from "../controllers/AuthController";
import {jwt_middleware, local_middleware} from "../middleware/authMiddlewarwe";

@Service()
export class AuthRoutes {
    private controller: AuthController;

    constructor(private readonly app: express.Application, private readonly baseRoute: string) {
        this.controller = Container.get(AuthController)
    }

    private Login(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, local_middleware, async (req: Request, resp: Response) => {
            resp.json(await this.controller.Login(req, resp))
        })
    }

    private Register(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            resp.json(await this.controller.Register(req, resp))
        })
    }

    private ConfirmRegister(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            resp.json(await this.controller.ConfirmRegister(req, resp))
        })
    }

    public create() {
        this.Login('Login');
        this.Register('register')
        this.ConfirmRegister('confirm')
    }
}
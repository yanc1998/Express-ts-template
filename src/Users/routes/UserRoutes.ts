import express from 'express'
import {Request, Response} from 'express'
import Container from 'typedi'
import {jwt_middleware} from '../../auth/middleware/authMiddlewarwe';
import {UsersController} from '../controllers/Users'

export class UserRoutes {
    private controller: UsersController;

    constructor(private readonly app: express.Application, private readonly baseRoute: string) {
        this.controller = Container.get(UsersController)
    }


    private Create(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, jwt_middleware, async (req: Request, resp: Response) => {
            resp.json(await this.controller.Create(req, resp))
        })
    }

    private Get(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            resp.json(await this.controller.Get(req, resp))
        })
    }

    private Paginate(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            resp.json(await this.controller.Paginate(req, resp))
        })
    }

    private Delete(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            resp.json(await this.controller.delete(req, resp))
        })
    }

    public create() {
        this.Create('create')
        this.Get('get')
        this.Paginate('paginate')
        this.Delete('delete')
    }

}
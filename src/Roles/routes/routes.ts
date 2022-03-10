import express from 'express'
import { Request, Response } from 'express'
import Container from 'typedi'
import { RolesController } from '../controllers/Roles'
export class RolesRoutes {

    constructor(private readonly app: express.Application, private readonly baseRoute: string) {

    }
    private Create(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            const controller = Container.get(RolesController)
            resp.json(await controller.Create(req,resp))
        })
    }

    private Get(route: string) {
        const completeRoute = `/${this.baseRoute}/${route}`
        console.log('post in route ' + completeRoute)
        this.app.post(completeRoute, async (req: Request, resp: Response) => {
            const controller = Container.get(RolesController)
            resp.json(await controller.Get(req,resp))
        })
    }

    public create() {
        this.Create('create')
        this.Get('get')
    }

}
import Container, { Inject, Service } from "typedi"
import { BaseController } from "../../base/controller/baseController"
import { Roles } from "../models/Roles.entity"
import { RoleService } from "../services/RolesService"
import express from 'express'
/**
 * IndexRoute
 * 
 * @class IndexRoute
 */
@Service()
export class RolesController extends BaseController<Roles> {

    /**
     * Constructor
     * 
     * @class IndexRoute
     * @method constructor
     */

    constructor(
        private readonly rolesService: RoleService) {
        super(rolesService)
    }

}


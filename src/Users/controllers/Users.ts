import Container, { Inject, Service } from "typedi";
import { BaseController } from "../../base/controller/baseController";
import { User } from "../models/User.entity";
import { UserRepository } from "../repositories/UserRepository";
import { getUsers } from '../services/getUsers';
import express from 'express'
import { UserService } from "../services/UserService";
/**
 * IndexRoute
 * 
 * @class IndexRoute
 */
@Service()
export class UsersController extends BaseController<User> {

    /**
     * Constructor
     * 
     * @class IndexRoute
     * @method constructor
     */

    constructor(
        private readonly userService: UserService) {
        super(userService)
    }
}


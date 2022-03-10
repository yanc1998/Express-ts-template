import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import express from 'express';
import Container from "typedi";
import {JwtStrategy} from "../../auth/strategies/jwtStrategy";
import {LocalStrategy} from "../../auth/strategies/localStrategy";
import {RolesRoutes} from "../../Roles/routes/routes";
import {UserRoutes} from "../../Users/routes/UserRoutes";
import passport from 'passport'
import {connectDatabase} from "../configFiles/databaseConfig";
import {AuthRoutes} from "../../auth/routes/authRoutes";
import {errorHandler} from "../core/middleware/errors";

/**
 * The Server 
 * 
 * @class Server
 */
export class Server {
    public app: express.Application;

    /**
     * Bootstrap the application
     * 
     * @class Server
     * @method bootstrap
     * @static
     * @return Returns the newly created injector for this app. Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor
     * 
     * @class Server
     * @method constructor
     */
    constructor() {
        // create express application
        this.app = express();

        // configure application
        this.config();

        // add api
        this.api();
        this.app.use(errorHandler)
    }

    /**
     * Create REST Api routes
     * 
     * @class Server
     * @method api
     */
    public api() {
        const baseRoute: string = process.env.BASE_API || 'api/'
        const rolesRoutes: RolesRoutes = new RolesRoutes(this.app, baseRoute + 'roles')
        const userRoutes: UserRoutes = new UserRoutes(this.app, baseRoute + 'user')
        const authRoutes: AuthRoutes = new AuthRoutes(this.app, baseRoute + 'auth')
        rolesRoutes.create()
        userRoutes.create()
        authRoutes.create()

        //poner las demas rutas 
    }

    /**
     * Configure application
     * 
     * @class Server
     * @method config
     */
    public config() {
        this.app.use(bodyParser.urlencoded({extended: false}))
        this.app.use(bodyParser.json())
        const jwtStrategy: JwtStrategy = Container.get(JwtStrategy)
        const localStrategy: LocalStrategy = Container.get(LocalStrategy)
        jwtStrategy.validate(passport)
        localStrategy.validate(passport)
        this.app.use(passport.initialize())
        connectDatabase().then(() => {
            console.log("connect database")
        })
    }

}


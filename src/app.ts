import { Server } from "./base/server/server";
import 'reflect-metadata'
import dotenv from 'dotenv'
dotenv.config()
const port: number = 3000
const app = Server.bootstrap().app;


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT || port}`);
});
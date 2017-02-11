import * as Hapi from "hapi";
import { IDatabase } from "../database";
import { IServerConfiguration } from "../configurations";
import UserController from "./controller";


export default function (server: Hapi.Server, serverConfigs: IServerConfiguration, database: IDatabase) {
    const userController = new UserController(serverConfigs, database);
    server.bind(userController);

    server.route({
        method: "POST",
        path: "/users",
        config: {
            handler: userController.create,
            description: "Create a new user."
        }
    })

    server.route({
        method: "POST",
        path: "/users/signIn",
        config: {
            handler: userController.signIn,
            description: "SignIn an existing user. Returns token."
        }
    })
}
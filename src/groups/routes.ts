import * as Hapi from "hapi";
import { IDatabase } from "../database";
import { IServerConfiguration } from "../configurations";
import GroupController from "./controller";


export default function (server: Hapi.Server, serverConfigs: IServerConfiguration, database: IDatabase) {
    const groupController = new GroupController(serverConfigs, database);
    server.bind(groupController);

    server.route({
        method: "POST",
        path: "/groups",
        config: {
            auth: "jwt",
            handler: groupController.create,
            description: "Create a new group."
        }
    })

    server.route({
        method: "POST",
        path: "/groups/{groupId}/messages",
        config: {
            auth: "jwt",
            handler: groupController.sendMessage,
            description: "Send message to group"
        }
    })
}
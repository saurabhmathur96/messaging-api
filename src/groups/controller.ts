import { IGroup } from "./group";
import { IDatabase } from "../database";
import { IServerConfiguration } from "../configurations";
import * as Hapi from "hapi";
import * as Jwt from "jsonwebtoken";
import * as Boom from "boom";

export default class GroupController {
    private database: IDatabase;
    private configs: IServerConfiguration;

    constructor(configs: IServerConfiguration, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    create(request: Hapi.Request, reply: Hapi.IReply) {
        reply({message: "todo"});
    }

    sendMessage(request: Hapi.Request, reply: Hapi.IReply) {
        reply({message: "todo"});
    }
}
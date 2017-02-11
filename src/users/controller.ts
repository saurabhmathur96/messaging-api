import { IUser } from "./user";
import { IDatabase } from "../database";
import { IServerConfiguration } from "../configurations";
import * as Hapi from "hapi";
import * as Jwt from "jsonwebtoken";
import * as Boom from "boom";

export default class UserController {
    private database: IDatabase;
    private configs: IServerConfiguration;

    constructor(configs: IServerConfiguration, database: IDatabase) {
        this.configs = configs;
        this.database = database;
    }

    private generateToken(user: IUser): string {
        const secret = this.configs.jwtSecret;
        const expiration = this.configs.jwtExpiration;

        return Jwt.sign({ "id": user._id }, secret, { "expiresIn": expiration })
    }

    public create(request: Hapi.Request, reply: Hapi.IReply) {
        const user: IUser = request.payload;

        this.database.users.create(user).then((user) => {
            const token: string = this.generateToken(user);
            reply({ "token": token }).code(201);
        }).catch((error) => {
            // DB error
            reply(Boom.badImplementation(error));
        })
    }

    public signIn(request: Hapi.Request, reply: Hapi.IReply) {
        const username = request.payload.username;
        const password = request.payload.password;

        this.database.users.findOne({ username: username })
            .then((user: IUser) => {

                if (!user) {
                    reply(Boom.unauthorized("User does not exist."));
                }


                if (!user.validatePassword(password)) {
                    reply(Boom.unauthorized("Password is invalid."));
                }

                const token = this.generateToken(user);
                reply({ "token": token });
            }).catch((error) => {
                reply(Boom.badImplementation(error));
            });

    }


}
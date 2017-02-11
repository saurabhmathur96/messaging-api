import { IPlugin, IPluginOptions, IPluginInfo } from "../interfaces";
import { IUser, UserModel } from "../../users/user";
import * as Hapi from "hapi";
var jwtPlugin = require("hapi-auth-jwt2");


export default (): IPlugin => {
    return {
        register: (server: Hapi.Server, options: IPluginOptions) => {

            const database = options.database;
            const serverConfig = options.serverConfigs;
            const validateUser = (decoded, request, callback) => {
                database.users.findOne({ username: decoded.username }).lean(true)
                    .then((user: IUser) => {
                        if (!user) {
                            return callback(null, false);
                        }
                        return callback(null, true);
                    });
            };
            return new Promise<void>((resolve, reject) => {
                server.register({
                    register: jwtPlugin
                }, (error) => {
                    if (error) {;
                        console.log("Error registering jwt plugin.");
                        return reject(error);
                    } else {
                        
                        server.auth.strategy("jwt", "jwt", false, {
                            key: serverConfig.jwtSecret,
                            validateFunc: validateUser,
                            verifyOptions: { algorithms: ["HS256"] }
                        });
                        return resolve();

                    }
                });
            });

        },
        info: (): IPluginInfo => {
            return {
                name: "JWT Authentication",
                version: "1.0.0"
            }
        }
    }
}
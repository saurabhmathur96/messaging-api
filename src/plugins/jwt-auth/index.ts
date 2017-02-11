import { IPlugin, IPluginOptions, IPluginInfo } from "../interfaces";
import { IUser, UserModel } from "../../users/user";
import * as Hapi from "hapi";

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
                server.register({
                    register: request("hapi-auth-jwt2")
                }, (error) => {
                    if (error) {
                        console.log("Error registering jwt plugin.");
                    } else {
                        server.auth.strategy("jwt", "jwt", false, {
                            key: serverConfig.jwtSecret,
                            validateFunc: validateUser,
                            verifyOptions: { algorithms: ["HS256"] }
                        });
                    }
                });
            }
        },
        info: (): IPluginInfo => {
            return {
                name: "JWT Authentication",
                version: "1.0.0"
            }
        }
    }
}
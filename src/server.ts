import * as Hapi from "hapi";
import * as Users from "./users";
import * as Groups from "./groups";
import { IDatabase }  from "./database";
import { IServerConfiguration } from "./configurations";
import { IPlugin, IPluginOptions } from "./plugins/interfaces";

export function init(configs: IServerConfiguration, database: IDatabase): Hapi.Server {
    const server = new Hapi.Server();

    server.connection({
        port: configs.port,
        routes: {
            cors: true
        }
    });

    const pluginOptions: IPluginOptions = {
        database: database,
        serverConfigs: configs
    }

    const plugins: Array<string> = configs.plugins;
    plugins.forEach((pluginName: string) => {
        let plugin: IPlugin = require(`./plugins/${pluginName}`).default();
        plugin.register(server, pluginOptions);
    });

    Groups.init(server, configs, database);
    Users.init(server, configs, database);

    return server;
}
import * as nconf from "nconf";
import * as path from "path";

const configs = new nconf.Provider({
    env: true,
    argv: true,
    store: {
        type: "file",
        file: path.join(__dirname, "..", "..",  `./config.${process.env.NODE_ENV || "dev"}.json`)
    }
});

export interface IDBConfiguration {
    connectionString: string;
}

export interface IServerConfiguration {
    port: number,
    jwtSecret: string,
    jwtExpiration: string,
    plugins: Array<string>
}

export function getDatabaseConfig(): IDBConfiguration {
    return configs.get("database");
}

export function getServerConfig(): IServerConfiguration {
    return configs.get("server");
}
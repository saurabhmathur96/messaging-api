import * as Server from "./server";
import * as Config from "./configurations";
import * as Database from "./database";


const dbConfig = Config.getDatabaseConfig();
const database = Database.init(dbConfig);

const serverConfig = Config.getServerConfig();
const server = Server.init(serverConfig, database)

server.start(() => {
    console.log(`Magic at ${server.info.uri}`);
})
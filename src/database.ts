import * as Mongoose from "mongoose";
import { IDBConfiguration } from "./configurations"

import { IUser, UserModel } from "./users/user";
import { IGroup, GroupModel } from "./groups/group";


export interface IDatabase {
    users: Mongoose.Model<IUser>;
    groups: Mongoose.Model<IGroup>;
}


export function init(config:IDBConfiguration): IDatabase {
    
    // Use Native ES6 Promises
    (<any>Mongoose).Promise = Promise;
    Mongoose.connect(config.connectionString);

    let db = Mongoose.connection;

    db.on("error", () => {
        console.log("Error connecting to database");
    });

    db.once("open", () => {
        console.log("Connected to database");
    });

    return {
        users: UserModel,
        groups: GroupModel
    }
}

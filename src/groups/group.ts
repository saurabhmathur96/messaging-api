import * as Mongoose from "mongoose";


export interface IMessage extends Mongoose.Document {
  by: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IGroup extends Mongoose.Document {
  name: string;
  members: Array<string>;
  messages: Array<IMessage>;
  createdAt: Date;
  updateAt: Date;
};

export const MessageSchema = new Mongoose.Schema({
  by: { type: String, required: true },
  content: { type: String, required: true }
}, {
    timestamps: true
  });

export const GroupSchema = new Mongoose.Schema({
  name: { type: String, unique: true, required: true },
  members: { type: [String] },
  messages: { type: [MessageSchema] },
}, {
    timestamps: true
  });


export const GroupModel = Mongoose.model<IGroup>("Group", GroupSchema);
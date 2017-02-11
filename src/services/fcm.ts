import * as Popsicle from "popsicle";

export interface INotfication {
    title: string;
    body: string;
}

export interface INotficationPayload {
    to: string;
    collapse_key: string;
    notification: INotfication;
    data: Object;
}

export class FirebaseCloudMessaging {

    private serverKey: string;

    constructor(serverKey: string) {
        this.serverKey = serverKey;
    }

    public send(payload: INotficationPayload): Promise<Object> {
        return new Promise<Object>((resolve, reject) => {
            Popsicle.request({
                method: "POST",
                url: "https://fcm.googleapis.com/fcm/send:443",
                body: payload,
                headers: {
                    "Host": "fcm.googleapis.com",
                    "Authorization": `key=${this.serverKey}`,
                    "Content-Type": "application/json"
                }
            }).use(Popsicle.plugins.parse("json"))
            .then((response: Object) => {
                resolve(response);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}
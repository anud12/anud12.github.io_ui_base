import { config } from "./config";
import { loadGoogleDependencies } from "./loadGoogleDependencies";

export const tokenClientPromise = new Promise<any>(async res => {
    await loadGoogleDependencies;
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: config.clientId,
        scope: config.scope,
        redirect_uri: "http://localhost:8080",
        callback: () => {
        }
    });

    res(tokenClient);
})
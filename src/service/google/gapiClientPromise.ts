import { config } from "./config";
import { loadGoogleDependencies } from "./loadGoogleDependencies";

export const gapiClientPromise = new Promise<any>(async resolve => {
    await loadGoogleDependencies;
    gapi.load('client', async () => {
        const client = await gapi.client.init({
            apiKey: config.apiKey,
            discoveryDocs: config.discoveryDocs,
        });
        await new Promise<void>(resolve => gapi.client.load('sheets', 'v4', function () {
            resolve();
        }));
        resolve(gapi);
    });
})
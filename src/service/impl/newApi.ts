import { rejects } from "assert";
import { Api } from "../api";
import { gapiClientPromise } from "../google/gapiClientPromise";
import { getExpirationDate } from "../google/getExpirationDate";
import { tokenClientPromise } from "../google/tokenClientPromise";
import { resolve } from "path";
import { async } from "rxjs";
import { url } from "inspector";
function addQueryParam(value) {
    const newUrl = new URL(window.location.href);
    newUrl.hash = JSON.stringify(value);
    window.history.replaceState(null, "", newUrl.href);
}

export const newApi: Api = {
    sessionName: () => new Promise(async resolve => {
        const gapi = await gapiClientPromise;
        gapi.client.request({
            'path': 'https://people.googleapis.com/v1/people/me?personFields=names',
            'method': 'GET',
            'callback': function (response) {
                resolve(response?.names?.[0]?.displayName);
            }
        });
    }),
    loadFromUrl: async () => {
        const gapi = await gapiClientPromise;
        const credentialsFromUrl = decodeURI(window.location.hash.replace("#", ""));
        if (credentialsFromUrl) {
            const credentials = JSON.parse(credentialsFromUrl);
            await gapi.client.init({});
            gapi.client.setToken(credentials);
            document.dispatchEvent(new CustomEvent('newApi-onChange'));
        }
        return false;
    },
    onChange: (callback) => {
        const fn = (event) => {
            callback(event);
        }
        globalThis?.document?.addEventListener("newApi-onChange", fn);
        return () => globalThis?.document?.removeEventListener("newApi-onChange", fn);
    },
    logout: async () => {
        const gapi = await gapiClientPromise;
        gapi.client.setToken(null)
        window.location.hash = "";
        document.dispatchEvent(new CustomEvent('newApi-onChange'))
    },
    login: async () => new Promise<void>(async (resolve) => {
        const tokenClient = await tokenClientPromise;

        try {
            if (await newApi.loadFromUrl()) {
                await getExpirationDate();
                return;
            }
        } catch {

        }
        tokenClient.callback = (credentialsResponse) => {
            addQueryParam(credentialsResponse);
            document.dispatchEvent(new CustomEvent('newApi-onChange'))
            resolve()
        }

        tokenClient.requestAccessToken({ prompt: 'consent' });
    })
}
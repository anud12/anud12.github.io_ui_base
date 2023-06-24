import { gapiClientPromise } from "./gapiClientPromise";

export const getExpirationDate = async () => {
    const gapi = await gapiClientPromise;
    const token = gapi?.auth?.getToken();
    if (!token) {
        return new Promise(res => res(undefined));
    }
    return fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token.access_token}`)
        .then(async res => {
            if (res.status !== 200) {
                throw Error(`getExpirationDate status ${res.status}`)
            }
            return (await res.json())?.expires_in;
        });
};
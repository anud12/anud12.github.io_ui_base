import { arrayToObject } from "../arrayToObjects";
import { gapiClientPromise } from "./gapiClientPromise";

export const loadFromSheet = (source: string):Promise<Array<any>> => new Promise<Array<any>>(async (resolve, reject) => {
    var url = `https://sheets.googleapis.com/v4/spreadsheets/${source}/values/Sheet1`;
    const gapi = await gapiClientPromise;
    var accessToken = gapi.auth.getToken().access_token;

    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + accessToken);

    var options = {
        method: 'GET',
        headers: headers
    };

    fetch(url, options)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Failed to fetch spreadsheet data');
            }
            return response.json();
        })
        .then(function (data) {
            var range = data.values;
            resolve(arrayToObject(range));
        });
}).catch(e => {
    throw e.result.error;
}) as any
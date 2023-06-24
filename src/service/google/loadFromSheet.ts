import { resolve } from "path";
import { arrayToObject } from "../arrayToObjects";
import { gapiClientPromise } from "./gapiClientPromise";

export const loadFromSheet = (source: string) => new Promise<Array<any>>(async (resolve, reject) => {
    const gapi = await gapiClientPromise;
    return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: source,
        range: 'Sheet1',
    }).then(function (response) {
        var range = response.result;
        resolve(arrayToObject(range.values))
    }, function (response) {
        reject(response)
    }).catch(response => {
        reject(response)
    });
}).catch(e => {
    throw e.result.error;
})
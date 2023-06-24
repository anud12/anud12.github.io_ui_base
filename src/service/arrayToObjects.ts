export function arrayToObject<T>(arr: Array<Array<string>>): Array<T> {
    var keys = arr[0];
    return arr.slice(1).map(function (row) {
        return keys.reduce(function (obj, key, i) {
            obj[key] = row[i];
            return obj;
        }, {} as T);
    });
}
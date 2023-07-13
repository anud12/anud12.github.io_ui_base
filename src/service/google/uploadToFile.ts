import { gapiClientPromise } from "./gapiClientPromise";

const fileToBase64 = (file: File) => {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve((reader?.result as string)?.split?.(',')[1]);
        }
    })
}

async function formDataToJson(formData) {
    const result = {};
    for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
            result[key] = await fileToBase64(value);
        } else {
            result[key] = value;
        }
    }
    return JSON.stringify(result);
}

export const uploadFormDataToFolder = (parentId: string, data) => async (event: SubmitEvent) => {
    event.preventDefault();
    // const formData = new FormData(event.target as HTMLFormElement);
    const gapi = await gapiClientPromise;
    const idToken = gapi.client.getToken().access_token;

    return fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
        method: "POST",
        headers: new Headers({
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json; charset=UTF-8'
        }),
        body: JSON.stringify({
            name: 'form-data.json',
            parents: [parentId]
        })
    }).then(async apiResponse => {
        return fetch(await apiResponse.headers.get('Location') ?? "", {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        })
    })
}
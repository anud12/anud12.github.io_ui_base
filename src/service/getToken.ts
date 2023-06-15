
const loadScript = (src: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        if (!globalThis.document) {
            return;
        }
        const script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
    })

const loadGoogleDependencies = Promise.all([
    loadScript('https://apis.google.com/js/api.js'),
    loadScript('https://accounts.google.com/gsi/client'),
])
const apiKey = "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA";
const clientId = "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive.metadata.readonly"
const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

const tokenClientPromise = new Promise<any>(async res => {
    await loadGoogleDependencies;
    const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        redirect_uri: "http://localhost:8080",
        callback: () => {
        }
    });
    res(tokenClient);
})

const gapiClientPromise = new Promise<any>(async resolve => {
    await loadGoogleDependencies;
    await new Promise<void>((resolve) => {
        gapi.load('client', resolve);
    });
    const client = await gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: discoveryDocs,
    });
    resolve(client);
})

export const getToken = async () => new Promise(async resolve => {

    const tokenClient = await tokenClientPromise;
    const gapi = await gapiClientPromise;
    tokenClient.callback = () => {
        resolve(gapi.client.getToken())
    }

    tokenClient.requestAccessToken({ prompt: 'consent' });
})
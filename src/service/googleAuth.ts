const apiKey = "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA";
const clientId = "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive.metadata.readonly"
const loadScript = (src: string): Promise<void> =>
  new Promise<void>((resolve, reject) => {
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

const getClient = new Promise<any>(async (res) => {
  await loadGoogleDependencies;
  await new Promise(res => gapi.load('client', res))

  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: scope,
    callback: () => {
    }
  });
  res(tokenClient);
})
export const googleSignIn = new Promise((res) => {
  if (!globalThis.document) {
    return;
  }
  const script = document?.createElement('script');

  script.src = 'https://apis.google.com/js/api.js';
  script.onload = async function () {
    await tokenClient

    await gapi.load('client', async () => {
      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
      }
    });
    res(tokenClient)
  };
  globalThis.document?.head.appendChild(script);
})
  ;
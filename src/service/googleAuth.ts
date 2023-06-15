const apiKey = "AIzaSyBtQ2WOyIUnaSWAhl3s5PA_LZkWtpWz5iA";
const clientId = "985280907031-ffvfnc8pi0ane99lso9dbl1m2l5oc9nn.apps.googleusercontent.com";
const scope = "https://www.googleapis.com/auth/drive.metadata.readonly"
export const drive = new Promise(res => {

  if (!globalThis.document) {
    return;
  }
  // const script = globalThis.document?.createElement('script');
  // script.src = 'https://apis.google.com/js/api.js';
  // script.onload = async function () {
  //   const tokenClient = await googleSignIn;
  //
  //   await gapi.load('client', async () => {
  //     if (gapi.client.getToken() === null) {
  //       // Prompt the user to select a Google Account and ask for consent to share their data
  //       // when establishing a new session.
  //       tokenClient.requestAccessToken({prompt: 'consent'});
  //     } else {
  //       // Skip display of account chooser and consent dialog for an existing session.
  //       tokenClient.requestAccessToken({prompt: ''});
  //     }
  //
  //     await gapi.client.init({
  //       apiKey: apiKey,
  //       discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
  //     }).then(function () {
  //       // Use the Google API client to fetch all files from Google Drive.
  //
  //       return gapi.client.drive.files.list({
  //         'pageSize': 10,
  //         'fields': 'nextPageToken, files(id, name)'
  //       });
  //     }).then(function (response) {
  //       // Print all files to console.
  //       console.log('Files:');
  //       var files = response.result.files;
  //       if (files && files.length > 0) {
  //         for (var i = 0; i < files.length; i++) {
  //           var file = files[i];
  //           console.log(file.name + ' (' + file.id + ')');
  //         }
  //       } else {
  //         console.log('No files found.');
  //       }
  //     }, function (error) {
  //       console.error(error);
  //     });;
  //
  //   });
  // }
  // globalThis.document?.head.appendChild(script);
});

let setGoogleCredentials: any = undefined;

export const googleCredentials = new Promise(res => {
  setGoogleCredentials = res;
})

export const googleSignIn = new Promise((res) => {
    if (!globalThis.document) {
      return;
    }
    const script = globalThis.document?.createElement('script');

    script.src = 'https://apis.google.com/js/api.js';
    script.onload = async function () {
      const tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: scope,
        callback: () => {
        }
      });

      await gapi.load('client', async () => {
        if (gapi.client.getToken() === null) {
          // Prompt the user to select a Google Account and ask for consent to share their data
          // when establishing a new session.
          tokenClient.requestAccessToken({prompt: 'consent'});
        } else {
          // Skip display of account chooser and consent dialog for an existing session.
          tokenClient.requestAccessToken({prompt: ''});
        }
      });
      res(tokenClient)
    };
    globalThis.document?.head.appendChild(script);
  })
;
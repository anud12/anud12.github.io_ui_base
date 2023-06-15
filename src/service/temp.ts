(async () => {
    // Promisify the script loading
    function loadScript(src: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Import statements for TypeScript
    const { TokenClient, Oauth2 } = google.accounts;

    // TODO: Set to client ID and API key from the Developer Console
    const CLIENT_ID = '<YOUR_CLIENT_ID>';
    const API_KEY = '<YOUR_API_KEY>';

    // Discovery doc URL for APIs used by the quickstart
    const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
    const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

    // Hide buttons initially
    const authorizeButton = document.getElementById('authorize_button');
    authorizeButton.style.visibility = 'hidden';

    const signoutButton = document.getElementById('signout_button');
    signoutButton.style.visibility = 'hidden';

    /**
     * Initializes the Gapi client.
     */
    async function initializeGapiClient(): Promise<void> {
        await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });
    }

    /**
     * Enables user interaction after all libraries are loaded.
     */
    function maybeEnableButtons(): void {
        authorizeButton.style.visibility = 'visible';
    }

    /**
     * Print metadata for first 10 files.
     */
    async function listFiles(): Promise<void> {
        let response;
        try {
            response = await gapi.client.drive.files.list({
                pageSize: 10,
                fields: 'files(id, name)',
            });
        } catch (err) {
            document.getElementById('content').innerText = err.message;
            return;
        }
        const files = response.result.files;
        if (!files || files.length === 0) {
            document.getElementById('content').innerText = 'No files found.';
            return;
        }
        // Flatten to string to display
        const output = files.reduce(
            (str, file) => `${str}${file.name} (${file.id})\n`,
            'Files:\n'
        );
        document.getElementById('content').innerText = output;
    }

    try {
        // Dynamically create script elements and wait for them to load
        await Promise.all([
            loadScript('https://apis.google.com/js/api.js'),
            loadScript('https://accounts.google.com/gsi/client'),
        ]);

        // Callback after api.js is loaded.
        await new Promise<void>((resolve) => {
            gapi.load('client', resolve);
        });
        await initializeGapiClient();

        // Callback after Google Identity Services are loaded.
        const tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined later
        });

        //  Sign in the user upon button click.
        function handleAuthClick(): Promise<void> {
            return new Promise<void>(async (resolve, reject) => {
                tokenClient.callback = async (resp) => {
                    if (resp.error !== undefined) {
                        reject(resp);
                    }
                    signoutButton.style.visibility = 'visible';
                    authorizeButton.innerText = 'Refresh';
                    await listFiles();
                    resolve();
                };

                if (gapi.client.getToken() === null) {
                    // Prompt the user to select a Google Account and ask for consent to share their data
                    // when establishing a new session.
                    tokenClient.requestAccessToken({ prompt: 'consent' });
                } else {
                    // Skip display of account chooser and consent dialog for an existing session.
                    tokenClient.requestAccessToken({ prompt: '' });
                }
            });
        }

        // Sign out the user upon button click.
        function handleSignoutClick(): Promise<void> {
            return new Promise<void>((resolve) => {
                const token = gapi.client.getToken();
                if (token !== null) {
                    google.accounts.oauth2.revoke(token.access_token);
                    gapi.client.setToken('');
                    document.getElementById('content').innerText = '';
                    authorizeButton.innerText = 'Authorize';
                    signoutButton.style.visibility = 'hidden';
                }
                resolve();
            });
        }

        // Attach click event listeners to buttons
        authorizeButton.addEventListener('click', handleAuthClick);
        signoutButton.addEventListener('click', handleSignoutClick);

        // Enable buttons when both Gapi and Gis are loaded
        function checkLibraryLoaded(): void {
            if (typeof gapi !== 'undefined' && typeof google !== 'undefined') {
                maybeEnableButtons();
            } else {
                setTimeout(checkLibraryLoaded, 100);
            }
        }
        checkLibraryLoaded();
    } catch (error) {
        console.error(error);
    }
})();

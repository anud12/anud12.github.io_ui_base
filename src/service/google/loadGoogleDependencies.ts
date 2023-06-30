const loadScript = (src: string): Promise<void> =>
    new Promise<void>((resolve, reject) => {
        if (!globalThis.document) {
            return;
        }
        resolve();
        // const script = document.createElement('script');
        // script.async = true;
        // script.defer = true;
        // script.src = src;
        // script.onload = () => resolve();
        // script.onerror = reject;
        // document.head.appendChild(script);
    })

export const loadGoogleDependencies = Promise.all([
    loadScript('https://apis.google.com/js/api.js'),
    loadScript('https://accounts.google.com/gsi/client'),
])
export type Api = {
    sessionName: () => Promise<string>,
    login: () => Promise<void>,
    loadFromUrl: () => Promise<boolean>,
    logout: () => Promise<void>,
    onChange: (callback: (session: Api) => void) => () => void;
}
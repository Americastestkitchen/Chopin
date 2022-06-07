export interface User{
    aid:string;
    token:string;
}
export interface PianoConfig{
    setAid: string;
    setDebug: boolean;
    setEndpoint: string;
    setExternalJWT: string;
    setUsePianoIdUserProvider: boolean;
    setUseTinypassAccounts: boolean;
}

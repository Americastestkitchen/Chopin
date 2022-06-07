import PianoAdapter from "./piano-adapter";
declare global {
    interface Window {
        tp: [];
        mixpanel: {
            track: (action: string, payload: {
                incode: string;
                location: string;
                type: string;
                status: string;
            }, transport: {
                transport: string;
            }) => void;
        };
    }
}
/**
 *
 *  When we decide to ad a new ad service we will have to change the type of adServicer
 *  Currently it is just reliant on the PianoAdapter, but it could be any adapter that responds to
 *  .init() and takes the lifecycle methods along with matchers/tags.
 *
 */
declare class AdServer {
    afterAdRender?: (() => void)[];
    afterAdInit?: (() => void)[];
    beforeAdInit?: (() => void)[];
    thirdPartyCallbacks?: (() => void)[];
    matchers?: string[];
    tags?: string[];
    user: {};
    adServicer?: PianoAdapter;
    constructor({ afterAdRender, afterAdInit, beforeAdInit, matchers, thirdPartyCallbacks, tags, adServicer, }: {
        afterAdRender?: any[];
        afterAdInit?: any[];
        beforeAdInit?: any[];
        matchers?: any[];
        thirdPartyCallbacks?: any[];
        tags?: any[];
        adServicer: any;
    });
    /**
     * Sets up the adapter for our Ad Service
     * Adapters api:
     * To render a template it REQUIRES an init() method
     * To interact with third-party services the adapter constructor REQUIRES an interface to receive an array of callbacks.
     * To match on custom variables it MAY have tags, matchers, or user-state
     * Lifecycle methods can be fired from the AdServer class or passed through to the Adapter.
     *
     * @remarks
     * Piano lifecycle methods lives inside the window.tp object so we have to pass through callbacks.
     * @param adServicer
     * @returns Adapter Class
     */
    setAdapter(adServicer: any): PianoAdapter;
    /**
     * @remarks
     * These methods are private and should be only called through #dispatchAd
     */
    executeBeforeAdInit(): void;
    executeAfterAdRender(): void;
    executeAfterAdInit(): void;
    /**
     * Gathers needed properties and creates a configuration obj
     *
     * @remarks
     * The user data could come from context or it could come from
     * @returns User
     */
    setUser(): {};
    /**
     * Execute advertisement and lifecycle methods.
     */
    dispatchAd(): void;
}
export { AdServer };

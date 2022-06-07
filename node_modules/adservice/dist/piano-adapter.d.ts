import type { User, PianoConfig } from "./types";
/**
 * Todo: Conditionally import SDK to support original
 * CV implementation that's running paywalls
 * Something like:
 *  check if window or window.navigator is undefined and if window.tp is undefined
 *
 * Todo: Separate the Piano Adapter from the AdServer. Create API so that the AdServer
 * will accept an adapter or a new instance of the Piano Adapter.
 *
 */
export default class PianoAdapter {
    afterRenderCallbacks?: (() => void)[];
    thirdPartyCallbacks?: (() => void)[];
    tp: any;
    user: User;
    result: any;
    debug: boolean;
    constructor({ thirdPartyCallbacks, afterRenderCallbacks, matchers, tags, debug, user }: {
        thirdPartyCallbacks?: any[];
        afterRenderCallbacks?: any[];
        matchers?: any[];
        tags?: any[];
        debug?: boolean;
        user: any;
    });
    debugLog(debug: any): void;
    /**
     * Returns the AID based on the current url
     */
    getAid(): string;
    /**
     * Retrieves the user token from cookies or from a user context.
     */
    getUserToken(): string;
    /**
     * Sets required user fields to execute a piano experience.
     *
     * @remarks
     * Piano only needs the custom variable to match, but the user-token has something to do on their side.
     * I am not sure what it does, but to be backwards compatible we will add it in there.
     *
     * We are passing in a user argument just in-case we need additional properties from our
     * context or cookie in a future iteration.
     *
     * @param user
     */
    setUser(user: any): {
        aid: string;
        token: string;
    };
    init(): void;
    /**
     * Configuration objects carry the necessary data to the third party callback
     * Each configuration object is going to be different based on the 'service'.
     * Required properties are service, and callbacks.
     *
     * @typedef Service {string}
     * @typedef Callbacks {[()=>void]}
     * @typedef {Service, Callbacks} ConfigObj
     * @param thirdPartyConfigs ConfigObj[]
     */
    setThirdPartyCallbacks(thirdPartyConfigs: any): void;
    setMixpanel({ status, action }: {
        status: any;
        action: any;
    }): void;
    setDisclaimer(): void;
    /**
     * We attach callbacks that fire before the browser renders the template
     *
     * @remarks
     *  This is not built to support third-party callbacks. Those need to be handled individually by their handlers.
     *
     * @param cbs
     */
    setBeforeAdInit(cbs: (() => void)[]): void;
    /**
     * We attach callbacks that fire after the browser renders the template
     *
     * @remarks
     *  This is not built to support third-party callbacks. Those need to be handled individually by their handlers.
     *
     * @param cbs
     */
    setAfterAdRender(cbs: (() => void)[]): void;
    /**
     * Set the user segments that will match on the piano segment
     * in the initial user segments phase of the composer experience
     *
     * i.e. experience rules, initial user segments, events and triggers, actions
     * https://docs.piano.io/track/overview-composer?chapter=5556#menu5556
     *
     * @param matchers
     */
    setCustomVariables(matchers: string[]): void;
    /**
     * Each experience in composer requires proper configuration.
     * This object will set up our configuration object properly to launch the expected experience.
     *
     * @returns PianoConfig
     */
    getConfigProperties(): PianoConfig;
    /**
     * Sets up the window.tp piano object in the specific way it requires.
     *
     * @remarks
     * window.tp expects to push tuples with the proper 'key' (at position tuple[0]).
     * todo: expand explanation
     */
    setEnvConfig(): void;
    /**
     * This configures the window tp object to accept custom tags.
     *
     * @remarks
     * Tags are a way for us to match experiences with great specificity. (Experience Rules Phase)
     * Tags are used in the experience, and can be rendered on the template.
     * Tags can be returned to be used in third-party integrations
     * https://docs.piano.io/content-tracking/#custags
     *
     * @param tags
     */
    setTags(tags: string[][]): void;
}

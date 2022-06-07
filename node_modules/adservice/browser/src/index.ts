import PianoAdapter from "./piano-adapter";

declare global {
  interface Window {
      tp: [];
      mixpanel: {
        track: (action:string, payload: {
          incode: string;
          location: string;
          type: string;
          status: string;
        },
        transport:{
          transport:string;
        })=>void;
      }
  }
}

/**
 *
 *  When we decide to ad a new ad service we will have to change the type of adServicer
 *  Currently it is just reliant on the PianoAdapter, but it could be any adapter that responds to
 *  .init() and takes the lifecycle methods along with matchers/tags.
 *
 */

class AdServer {
    afterAdRender?:(() => void)[];
    afterAdInit?:(() => void)[];
    beforeAdInit?:(() => void)[];
    thirdPartyCallbacks?:(()=> void)[];
    matchers?:string[];
    tags?:string[];
    user:{};
    adServicer?: PianoAdapter;
    constructor({
      afterAdRender = [],
      afterAdInit = [],
      beforeAdInit = [],
      matchers = [],
      thirdPartyCallbacks = [],
      tags = [],
      adServicer,
    }){
      this.afterAdInit = afterAdInit;
      this.afterAdRender = afterAdRender;
      this.beforeAdInit = beforeAdInit;
      this.matchers = matchers;
      this.tags = tags;
      this.thirdPartyCallbacks = thirdPartyCallbacks;
      this.user = this.setUser();
      this.adServicer = this.setAdapter(adServicer);
    }

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
    setAdapter(adServicer):PianoAdapter{
      const pianoConfig =   {
        afterRenderCallbacks: this.afterAdRender,
        matchers: this.matchers,
        tags: this.tags,
        thirdPartyCallbacks: this.thirdPartyCallbacks,
        user: this.user
     }
      switch (adServicer) {
        case "piano":{
          return new PianoAdapter(pianoConfig)
        }
        case "atk":{
          //configure in house AdService
        }
        default:{
          return new PianoAdapter(pianoConfig)
        }
      }
    }

    /**
     * @remarks
     * These methods are private and should be only called through #dispatchAd
     */
    executeBeforeAdInit():void {
      this.beforeAdInit.forEach((cb) => cb());
    }
    executeAfterAdRender():void {
      this.afterAdRender.forEach((cb) => cb());
    }
    executeAfterAdInit():void {
      this.afterAdInit.forEach((cb) => cb());
    }

    /**
     * Gathers needed properties and creates a configuration obj
     *
     * @remarks
     * The user data could come from context or it could come from
     * @returns User
     */
    setUser(){
      return {};
    }

    /**
     * Execute advertisement and lifecycle methods.
     */
    dispatchAd(){
        this.executeBeforeAdInit();
        this.adServicer.init();
        this.executeAfterAdInit();
    }
}

export { AdServer }

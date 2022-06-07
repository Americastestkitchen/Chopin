# Piano Adapter Documentation

Configures mixpanel's global api for tracking events with piano template content fields

## @remarks

We are borrowing a pattern from redux, instead of action and payload we have mixpanel properties of status and actions
Actions are the event callbacks taking piano content fields and parsing the information we require for each specific event.

We are using external events launch these callback. A hacky solution currently but we are injecting a third party iframe into our
application. There is a limited scope of interaction we can have with the template. But what we don't want is to couple our code
where the template is getting rendered. So hacky > heavily coupled currently.

https://docs.piano.io/offer-template-essentials/#externalevent

Every action that we want to track with mixpanel we add an additional case and add an external event on the template
We have to trigger it with javascript on the template if it is not a user triggered event (until we find a better way).

todo: add all of the available fields we get from the piano params obj and the params.params obj
This function maps the params data received from the event we get from piano
including custom parameters we have to set up in the external-event data-attributes
We can not target traditional data-attributes :frown

## @example

A element like this:

```html
<span
  id="mixpanel-params"
  external-event="presented"
  external-event-adtype="[%% ad-type %%]"
  external-event-incode="[%% incode %%]"
  external-event-deviceType="[%% deviceType %%]"
  external-event-clickdomain="[%% click-domain %%]"
  external-event-mdc="[%% mdc %%]"
></span>
```

will create an object like this

```json
{
  "adtype": "membership",
  "incode": "MAHHTFT5R",
  "devicetype": "tablet",
  "clickdomain": "atk",
  "mdc": "AF0111MA1R"
}
```

external-event data attribute will be the event.eventName
external-event="presented" : event.eventName = "presented
In the custom script we have to manually trigger an event that is not cause by
user interaction. For this example we want to be able to fire a presented event to mixpanel
but because it isn't user triggered we will click on the span that will fire the external-event

```html
<div custom-script>document.getElementById("mixpanel-params").click();</div>
```

params object returned from piano:

```json
{
 aid: "P3MUmmU9pu"
 experienceId: "EXY9MK7TYY6H"
 displayMode: "inline"
 iframeId: "offer_5e3acb9734ad2dbcff7d-0"
 offerId: "fakeOfferId"
 templateId: "OT25N7GNJAE8"
 templateVariantId: "OTVGIT287CEEO"
 url: "http://localhost:8080"
}
```

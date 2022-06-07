# AdService

## Installation

We are leveraging npm's install with a github url.

Espresso Implementation add
"ad-service": "git+https://github.com/Americastestkitchen/AdService.git",
and yarn

```shell
npm install git+https://github.com/Americastestkitchen/AdService.git

- specific branch
"adservice": "git+https://github.com/Americastestkitchen/AdService.git#jb-init-setup",
```

Example Espresso Component Integration
Can't load SDK with CV hitting CDN in dry inline

```
import React, { useEffect, useState } from 'react';

const AdService = ({
    className,
    currentUserSegment,
}) => {
  const [adServe, setAdServe] = useState(null)
  useEffect(() => {
    const getSDK = async () => {
      const classUtil = await import('adservice/dist');
      console.log('testing times', classUtil, classUtil.default)
      setAdServe(classUtil)
    }
    getSDK();
  }, []);

  useEffect(() => {
    const mixpanelPresented = {
      service: 'mixpanel',
      action: 'Membership Block',
      status: 'Presented',
    };
    // emailcapture
    // how we use dialog config
    const mixpanelAccepted = {
      service: 'mixpanel',
      action: 'Membership Block',
      status: 'Accepted',
    };

    const customVariable = ['userSegment', "demon"];
    if (adServe) {
      const piano = new adServe.default({
        adServicer: 'piano',
        matchers: [customVariable],
        thirdPartyCallbacks: [
          mixpanelPresented,
          mixpanelAccepted,
        ],
        tags: [['testing']],
      })
      piano.dispatchAd();
    }
  }, [currentUserSegment, adServe])

  return (
    <div id="piano-test-container"></div>
  );
}

export default AdService;
```

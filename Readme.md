# firestore-decorators

> Typescript decorators for cloud functions / firebase functions

## Features

- create functions: onCall/onRequest methods
- create auth listeners: onCreate/onDelete methods
- create firestore and realtime database listeners: (onWrite/onUpdate/onCreate/onDelete)
- create your own middlewares
- code spliting

### Overview

Here an example to create a controller:

```
import { firestore } from "firebase-admin";
import { fireFunction } from "firestore-decorators";

export class myController {
  @fireFunction({ region: "europe-west1", type: "onCall" })
  async setCounterValue(data, context) {
    const counterRef = firestore().doc(`state/counter`);
    const { number } = data;

    counterRef.update({ number });
    return { ok: true };
  }
}
```

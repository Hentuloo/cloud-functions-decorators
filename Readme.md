# cloud-functions-decorators

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

export class MyController  {
  @fireFunction({ region: "europe-west1", type: "onCall" })
  async setCounterValue(data, context) {
    const counterRef = firestore().doc(`state/counter`);
    const { number } = data;

    counterRef.update({ number });
    return { ok: true };
  }
}
```

To bind this controller in your _/src/index.ts_ use it like:

```
import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin";
import { bindFireControllers } from "firestore-decorators";

import { MyController } from "./controllers/MyController";

initializeApp(functions.config().firebase);
const controllers = [new MyController()];

const fireFunctions = bindFireControllers(controllers);
const keys = Object.keys(fireFunctions);
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});
```

create middlewares example:

```
// 'src/middlewares'
import { https } from "firebase-functions";

export const useAuth = (
  data: any,
  context: https.CallableContext,
) => {
  if (!context) {
    throw new Error('Pass context field');
  }
  if (!context.auth) {
    throw new https.HttpsError(
      'unauthenticated',
      'not authenticated!',
    );
  }
};

//'In some controller'
@use(useAuth)
@fireFunction({ region: "europe-west1", type: "onCall" })
async protectedRoute(data: CreateRoomData, context) { }
```

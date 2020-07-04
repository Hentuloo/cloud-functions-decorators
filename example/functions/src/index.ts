import * as functions from "firebase-functions";
import { initializeApp } from "firebase-admin";
import { bindFireControllers } from "firestore-decorators";

import { RoomsController } from "./controllers/RoomsController";
import { AuthController } from "./controllers/AuthController";

initializeApp(functions.config().firebase);

// bind firebase-functions controllers
const fireFunctions = bindFireControllers([
  new RoomsController(),
  new AuthController(),
]);

const keys = Object.keys(fireFunctions);
// export all binded Cloud Function
keys.forEach((key: string) => {
  exports[key] = fireFunctions[key];
});

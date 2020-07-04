import { listenAuth } from "firestore-decorators";

export class AuthController {
  @listenAuth({ type: "onCreate" })
  async onCreateUser(userRecord, context) {
    const { uid, displayName = "user-name", photoURL = null } = userRecord;

    // create document in firestore
  }
}

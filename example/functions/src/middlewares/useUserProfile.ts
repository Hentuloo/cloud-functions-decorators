import { https } from "firebase-functions";
import { firestore } from "firebase-admin";

export interface UserDocument {
  displayName: string;
  photoURL: string;
  wins: number;
}

export interface WithUserProfile {
  user: UserDocument;
}

export const useUserProfile = async (
  data: any,
  context: https.CallableContext
) => {
  const { uid } = context.auth;
  if (!uid) {
    throw new https.HttpsError("unauthenticated", "not authenticated!");
  }
  const userRef = firestore().doc(`users/${uid}`);

  const userSnap = await userRef.get();

  const user = { uid, ...userSnap.data() };
  data.user = user;
};

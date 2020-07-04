import { https } from "firebase-functions";

export const useAuth = (data: any, context: https.CallableContext) => {
  if (!context) {
    throw new Error("Pass context field");
  }
  if (!context.auth) {
    throw new https.HttpsError("unauthenticated", "not authenticated!");
  }
};

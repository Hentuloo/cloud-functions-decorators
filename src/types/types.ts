export enum MetadataT {
  fireFunction,
  middleware,
  databaseListener,
  authListener,
}
export type ListenAuthTypes = "onCreate" | "onDelete";
export type FireFunctionsTypes = "onCall" | "onRequest";
export type DatabseListenersTypes =
  | "onWrite"
  | "onUpdate"
  | "onCreate"
  | "onDelete";
export type DatabaseTypes = "firestore" | "realtime";

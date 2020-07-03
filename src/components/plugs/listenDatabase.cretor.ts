import { database, https, firestore, Change } from "firebase-functions";
import { ListenDatabaseOptions } from "./listenDatabase.decorator";

interface BindDatabaseListenerType extends ListenDatabaseOptions {
  middlewares: Function[];
  controller: any;
  method: string;
}
export const bindDatabaseListener = ({
  listenerType,
  dbType,
  middlewares,
  controller,
  method,
  ref,
}: BindDatabaseListenerType) => {
  let db = dbType === "firestore" ? firestore.document : database.ref;

  return db(ref)[listenerType](async (data: any, context: any) => {
    for await (const fn of middlewares) {
      await fn(data, context);
    }
    return controller[method](data, context);
  });
};

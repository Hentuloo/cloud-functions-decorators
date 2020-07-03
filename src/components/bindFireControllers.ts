import { MetadataT } from "../types/types";
import { bindFireFunction } from "./plugs/fireFunction.cretor";
import { bindDatabaseListener } from "./plugs/listenDatabase.cretor";
import { bindAuthListener } from "./plugs/authListener.cretor";
import { FireFunctionOptions } from "./plugs/fireFunction.decorator";
import { ListenAuthOptions } from "./plugs/authListener.decorator";
import { ListenDatabaseOptions } from "./plugs/listenDatabase.decorator";

class Controller {
  [key: string]: any;
}
export type IController = Controller;

export const bindFireControllers = (controllers: IController[]) => {
  let fireMethods: { [key: string]: any } = {};
  controllers.forEach((controller) => {
    const methods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(controller)
    );

    methods.forEach((method) => {
      if (method === undefined || method === "constructor") return;
      const middlewares =
        Reflect.getMetadata(MetadataT.middleware, controller, method) || [];

      const fireFunction = Reflect.getMetadata(
        MetadataT.fireFunction,
        controller,
        method
      ) as FireFunctionOptions;
      if (fireFunction) {
        fireMethods[method] = bindFireFunction({
          controller,
          method,
          middlewares,
          region: fireFunction.region,
          type: fireFunction.type,
        });
      }

      const authListener = Reflect.getMetadata(
        MetadataT.authListener,
        controller,
        method
      ) as ListenAuthOptions;
      if (authListener) {
        fireMethods[method] = bindAuthListener({
          controller,
          method,
          middlewares,
          type: authListener.type,
        });
      }

      const databaseListener = Reflect.getMetadata(
        MetadataT.databaseListener,
        controller,
        method
      ) as ListenDatabaseOptions;
      if (databaseListener) {
        fireMethods[method] = bindDatabaseListener({
          controller,
          method,
          middlewares,
          ref: databaseListener.ref,
          dbType: databaseListener.dbType,
          listenerType: databaseListener.listenerType,
        });
      }
    });
  });
  return fireMethods;
};

import { region, https, Response } from "firebase-functions";
import { FireFunctionOptions } from "./fireFunction.decorator";
import { CallableContext } from "firebase-functions/lib/providers/https";
interface BindFireFunctionType extends FireFunctionOptions {
  middlewares: Function[];
  controller: any;
  method: string;
}

export const bindFireFunction = ({
  region: choosedRegion,
  type,
  middlewares,
  controller,
  method,
}: BindFireFunctionType) => {
  return region(choosedRegion).https[type](
    async (data: any, context: CallableContext | Response<any>) => {
      try {
        for await (const fn of middlewares) {
          await fn(data, context);
        }
        return controller[method](data, context);
      } catch ({ code, message, details, name }) {
        console.error(JSON.stringify({ code, message, details, name }));
        throw new https.HttpsError("unknown", code, {
          message,
          details,
          name,
        });
      }
    }
  );
};

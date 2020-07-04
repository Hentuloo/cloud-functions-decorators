import { region, Response } from "firebase-functions";
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
      for await (const fn of middlewares) {
        await fn(data, context);
      }
      return controller[method](data, context);
    }
  );
};

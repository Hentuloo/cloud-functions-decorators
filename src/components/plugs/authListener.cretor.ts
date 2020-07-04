import { auth } from "firebase-functions";
import { ListenAuthTypes } from "../../types/types";

interface AuthListenerProps {
  type: ListenAuthTypes;
  middlewares: Function[];
  controller: any;
  method: string;
}

export const bindAuthListener = ({
  type,
  middlewares,
  controller,
  method,
}: AuthListenerProps) => {
  return auth.user()[type](async (userRecord, context) => {
    for await (const fn of middlewares) {
      await fn(userRecord, context);
    }
    return controller[method](userRecord, context);
  });
};

import { MetadataT } from "../../types/types";
import "reflect-metadata";

/**
 * Decorator
 *
 * add middleware
 * @example
 * const useAuth = (data,context) => {}
 * class Sth {
 * use(useAuth)
 * fireFunction({ region: 'europe-west1', type: 'onCall' })
 */
export const use = (newMiddleware: Function) => {
  return (target: object | any, key: string | symbol) => {
    const middlewares =
      Reflect.getMetadata(MetadataT.middleware, target, key) || [];
    Reflect.defineMetadata(
      MetadataT.middleware,
      [...middlewares, newMiddleware],
      target,
      key
    );
  };
};

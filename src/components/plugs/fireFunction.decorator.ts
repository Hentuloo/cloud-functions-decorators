import { SUPPORTED_REGIONS } from "firebase-functions";
import "reflect-metadata";
import { MetadataT, FireFunctionsTypes } from "../../types/types";

export type FireFunctionOptions = {
  region: typeof SUPPORTED_REGIONS[number];
  type: FireFunctionsTypes;
};

/**
 * Decorator
 *
 * Create cloud function
 * @example
 * class Sth {
 * fireFunction({ region: 'europe-west1', type: 'onCall' })
 * async webhook (data, context){}}
 * }
 *
 * will be converted to:
 *
 * exports.webhook = functions.https.onCall((req, res) => {});
 */
export function fireFunction({
  region,
  type,
}: FireFunctionOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.fireFunction,
      { type, region },
      target,
      key
    );
  };
}

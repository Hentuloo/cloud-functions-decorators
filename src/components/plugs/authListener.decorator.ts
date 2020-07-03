import "reflect-metadata";
import { ListenAuthTypes, MetadataT } from "../../types/types";

export type ListenAuthOptions = {
  type: ListenAuthTypes;
};
/**
 * Decorator
 *
 * Create auth trigger
 * @example
 * class AuthController {
 * listenAuth({ type: 'onCreate' })
 * async onCreateUser(userRecord, context) {}
 *
 * will be converted to:
 *
 * exports.listenAuth = functions.auth.user().onCreate((user,context) => {});
 */
export function listenAuth({ type }: ListenAuthOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(MetadataT.authListener, { type }, target, key);
  };
}

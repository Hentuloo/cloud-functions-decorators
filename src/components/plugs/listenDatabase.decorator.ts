import {
  MetadataT,
  DatabseListenersTypes,
  DatabaseTypes,
} from "../../types/types";

export type ListenDatabaseOptions = {
  dbType: DatabaseTypes;
  ref: string;
  listenerType: DatabseListenersTypes;
};

/**
 * Decorator
 *
 * Create firestore/real-time database trigger
 * @example
 * class CitiesController {
 * listenDatabase({
 *  dbType: 'firestore',
 *  listenerType: 'onCreate',
 *  ref: '/cities/{cityId}',
 * })
 * async onCreateCity(snap, context) {}
 * }
 *
 * will be converted to:
 *
 * exports.onCreateCity = functions.firestore.document('/cities/{cityId}').onCreate((snap, context) => {});
 *
 * For real-time database:
 *
 * @example
 * class PresenceController {
 * listenDatabase({
 *  dbType: 'realtime',
 *  listenerType: 'onUpdate',
 *  ref: '/status/{userId}',
 * })
 * async listenStatusChange(snap, context) {}
 * }
 *
 * will be converted to:
 *
 * exports.listenStatusChange = functions.database.ref('/status/{userId}').onUpdate((snap, context) => {});
 */
export function listenDatabase({
  dbType,
  listenerType,
  ref,
}: ListenDatabaseOptions): MethodDecorator {
  return (target: object | any, key: string | symbol) => {
    Reflect.defineMetadata(
      MetadataT.databaseListener,
      {
        dbType,
        listenerType,
        ref,
      },
      target,
      key
    );
  };
}

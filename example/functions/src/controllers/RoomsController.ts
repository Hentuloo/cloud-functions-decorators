import { firestore } from "firebase-admin";
import { useAuth } from "../middlewares/useAuth";
import { useValidator } from "../middlewares/useValidator";
import { useUserProfile, WithUserProfile } from "../middlewares/useUserProfile";
import { use, fireFunction } from "firestore-decorators";

interface CreateRoomData extends WithUserProfile {
  title: string;
  maxPlayersNumber: number;
  password?: string;
}

export class RoomsController {
  @use(
    useValidator({
      title: [
        "required",
        "min:5",
        "max:15",
        "regex:/^[a-zA-Z0-9ęółśążźćńĘÓŁŚĄŻŹĆŃ ]{4,15}$/i",
      ],
      password: "required|alpha_num|min:4|max:16",
      maxPlayersNumber: "required|integer|min:2|max:5",
    })
  )
  @use(useAuth)
  @use(useUserProfile)
  @fireFunction({ region: "europe-west1", type: "onCall" })
  async createRoom(data: CreateRoomData, context) {
    const { uid } = context.auth;
    const {
      title,
      maxPlayersNumber,
      password,
      user: { displayName, photoURL, wins },
    } = data;

    const gamesCollection = firestore().collection(`games`);
    const ref = gamesCollection.doc();
    const newRoomId = ref.id;
    ref.create({
      registeredUsers: {
        [uid]: { displayName, photoURL, wins },
      },
      title,
      maxPlayersNumber,
      startTimestamp: null,
      endTimestamp: null,
      password: password,
      creator: uid,
      created: Date.now(),
      usersByScores: null,
    });

    return {
      roomId: newRoomId,
      title,
      maxPlayersNumber,
      password,
    };
  }
}

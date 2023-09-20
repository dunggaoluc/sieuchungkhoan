import { app } from "../../config";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth/";
const auth = getAuth(app);

export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    if (result) sessionStorage.setItem("user", result?.user?.email as string);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

const googleAuth = new GoogleAuthProvider();
export const login = async () => {
  await signInWithPopup(auth, googleAuth)
    .then((result) =>
      sessionStorage.setItem("user", result?.user?.email as string),
    )
    .catch(function (error: any) {
      if (error.code === "auth/cancelled-popup-request") {
        console.log("Authentication process was canceled.");
      } else {
        console.log("Firebase authentication error:", error);
      }
    });
};

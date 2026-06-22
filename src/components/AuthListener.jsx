import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { auth } from "../firebase/config";
import { setUser, clearUser } from "../store/userSlice";
import { createUserIfNotExists } from "../firebase/firestore";

function AuthListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          await createUserIfNotExists(user);

          dispatch(
            setUser({
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            }),
          );
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Auth sync failed:", error);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}

export default AuthListener;

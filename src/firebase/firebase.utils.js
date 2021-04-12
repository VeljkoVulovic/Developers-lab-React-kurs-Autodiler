import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC5asuMmm-FBSYk9m8b11fEj14p71owSoA",
  authDomain: "auto-diler-daaec.firebaseapp.com",
  databaseURL:
    "https://auto-diler-daaec-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auto-diler-daaec",
  storageBucket: "auto-diler-daaec.appspot.com",
  messagingSenderId: "992162874037",
  appId: "1:992162874037:web:38af307c075b632fdfb4fc",
  measurementId: "G-TLXY6HVHE5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

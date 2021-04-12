// import app from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const config = {
//   apiKey: "AIzaSyC5asuMmm-FBSYk9m8b11fEj14p71owSoA",
//   authDomain: "auto-diler-daaec.firebaseapp.com",
//   databaseURL:
//     "https://auto-diler-daaec-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "auto-diler-daaec",
//   storageBucket: "auto-diler-daaec.appspot.com",
//   messagingSenderId: "992162874037",
//   appId: "1:992162874037:web:38af307c075b632fdfb4fc",
//   measurementId: "G-TLXY6HVHE5",
// };

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//     this.auth = app.auth();
//     this.db = app.firestore();
//   }

//   login(email, password) {
//     return this.auth.signInWithEmailAndPassword(email, password);
//   }

//   logout() {
//     return this.auth.signOut();
//   }

//   async register(name, email, password) {
//     await this.auth.createUserWithEmailAndPassword(email, password);
//     return this.auth.currentUser.updateProfile({
//       displayName: name,
//     });
//   }

//   isInitialized() {
//     return new Promise((resolve) => {
//       this.auth.onAuthStateChanged(resolve);
//     });
//   }

//   getCurrentUserName() {
//     return this.auth.currentUser && this.auth.currentUser.displayName;
//   }
// }

// export default new Firebase();

// // firebase initializeApp(config);

// // export const auth = firebase.auth();
// // export const firestore = firebase.firestore();

// // const provider = new firebase.auth.GoogleAuthProvider();
// // provider.setCustomParameters({ prompt: 'select_account' });
// // export const signInWithGoogle = () => auth.signInWithPopup(provider);

// // export default firebase;

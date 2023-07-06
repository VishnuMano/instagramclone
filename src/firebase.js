import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAiKdIc0gElHeQjsm1t9425haHZ5VkseyA",
  authDomain: "instagram-clone-react-3722d.firebaseapp.com",
  projectId: "instagram-clone-react-3722d",
  storageBucket: "instagram-clone-react-3722d.appspot.com",
  messagingSenderId: "28508782687",
  appId: "1:28508782687:web:baac81a8424149eb6ddbea",
  measurementId: "G-RYGZP0MS0Z",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };

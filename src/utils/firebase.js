import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfthvC5lUAL-Z1r9OWtkTZYFQ6-Y7MtSg",
  authDomain: "marvelmix-movie.firebaseapp.com",
  projectId: "marvelmix-movie",
  storageBucket: "marvelmix-movie.appspot.com",
  messagingSenderId: "756132197736",
  appId: "1:756132197736:web:24a038cbc111442f9c52dd",
};

const app = initializeApp(firebaseConfig);

//Authentication
const appAuth = getAuth(app);
//Sign in with Google

const googleProvider = new GoogleAuthProvider();

const signInWithGooglePopup = async () =>
  await signInWithPopup(appAuth, googleProvider);

//for User normal SignUP and Sign In using Email and password
//For Sign Up
const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return createUserWithEmailAndPassword(appAuth, email, password);
};
//For Sign In
const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return signInWithEmailAndPassword(appAuth, email, password);
};

//firestore DB
const appDB = getFirestore(app);
//here additionalInformation ={} this is a optional argument
const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(appDB, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("Error creating User", err.message);
    }
  }
  return userDocRef;
};

export {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInAuthUserWithEmailAndPassword,
  appDB,
};

// const addData = async (collection, id, val) => {
//   const res = await setDoc(doc(appDB, collection, id), val);
//   console.log(res);
// };
// addData("cities", "LA", { name: "Los Angeles", state: "CA", country: "USA" });
// addData("cities", "WD", { name: "Washington", state: "DC", country: "USA" });

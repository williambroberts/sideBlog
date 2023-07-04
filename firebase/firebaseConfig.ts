// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore,initializeFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAW4I-7qAfVyD7HXfUZkeSNujmqkr0ACbI",
  authDomain: "sideblog-b2118.firebaseapp.com",
  projectId: "sideblog-b2118",
  storageBucket: "sideblog-b2118.appspot.com",
  messagingSenderId: "786628450431",
  appId: "1:786628450431:web:dab2745cd535ecb669474a"
};

// Initialize Firebase

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export {firebase_app }

 export const firestore = initializeFirestore(firebase_app, {
    experimentalForceLongPolling: true, // this line
   // useFetchStreams: false, // and this line
  })
export const auth = getAuth(firebase_app)
export const storage = getStorage(firebase_app)
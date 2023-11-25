// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeaVV54nQewGlvQtTdUpMb925ZC8oh9Ng",
  authDomain: "cpcs-241-images.firebaseapp.com",
  projectId: "cpcs-241-images",
  storageBucket: "cpcs-241-images.appspot.com",
  messagingSenderId: "284328269494",
  appId: "1:284328269494:web:dbf242272cb8f178917817",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export { app };

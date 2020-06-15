import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAGcKWLirFintSSKEzMpxqdJWWW0rAj2Og",
  authDomain: "react-quiz-59330.firebaseapp.com",
  databaseURL: "https://react-quiz-59330.firebaseio.com",
  projectId: "react-quiz-59330",
  storageBucket: "react-quiz-59330.appspot.com",
  messagingSenderId: "85136464805",
  appId: "1:85136464805:web:8e60241699fe165c7ea64c",
  measurementId: "G-8B92D93TWN",
};
// Initialize Firebase

const initFirebase = () => {
  firebase.initializeApp(firebaseConfig);
}

export default initFirebase;
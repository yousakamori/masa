import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyAH8Gw0R2IYADc_EIMpWUPiHenpqDzqnEU",
  authDomain: "masa-9c0f7.firebaseapp.com",
  projectId: "masa-9c0f7",
  storageBucket: "masa-9c0f7.appspot.com",
  messagingSenderId: "618529291201",
  appId: "1:618529291201:web:9f3d29a25af3963e21cd40",
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
}

export default firebase;

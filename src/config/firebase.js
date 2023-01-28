import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdr5WLVD5xMvikScjE5dWh19PAApRyric",
  authDomain: "careergps-dbf1b.firebaseapp.com",
  projectId: "careergps-dbf1b",
  storageBucket: "careergps-dbf1b.appspot.com",
  messagingSenderId: "249131708762",
  appId: "1:249131708762:web:37436f3e9dac8d9b2a4363"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
    auth
}
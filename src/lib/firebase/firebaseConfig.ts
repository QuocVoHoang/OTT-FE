import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvtFNKCaoXmbZk1sUNmxMzizDO0kJ3Ff8",
  authDomain: "ott-chatapp-54af5.firebaseapp.com",
  projectId: "ott-chatapp-54af5",
  storageBucket: "ott-chatapp-54af5.firebasestorage.app",
  messagingSenderId: "237022984687",
  appId: "1:237022984687:web:d8b547227fc369a56ede1a",
  measurementId: "G-1WW2QW2BL8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage()

export {auth}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUw5QkA8MWnUus5PYM-BSKTVVGL8gRVsg",
  authDomain: "construahistoria-ec81b.firebaseapp.com",
  databaseURL: "https://construahistoria-ec81b-default-rtdb.firebaseio.com",
  projectId: "construahistoria-ec81b",
  storageBucket: "construahistoria-ec81b.firebasestorage.app",
  messagingSenderId: "456242999327",
  appId: "1:456242999327:web:143ede3fbbcb37051f252a",
  measurementId: "G-XWXGWN695B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Exportar para uso no script.js
export { database, ref, set, get, push };

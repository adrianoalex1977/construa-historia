// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get, push } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUw5QkA8MWnUus5PYM-BSKTVVGL8gRVsg",
  authDomain: "construahistoria-ec81b.firebaseapp.com",
  databaseURL: "https://construahistoria-ec81b-default-rtdb.firebaseio.com",
  projectId: "construahistoria-ec81b",
  storageBucket: "construahistoria-ec81b.appspot.com",
  messagingSenderId: "456242999327",
  appId: "1:456242999327:web:143ede3fbbcb37051f252a",
  measurementId: "G-XWXGWN695B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Export for use in other modules
export { database, ref, set, get, push };
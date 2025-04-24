// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// Configuração Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Exportações
export { database, ref, set, get, push }; push };
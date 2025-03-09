// Importando o Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


// 🔹 Substitua pelos seus dados do Firebase 🔹
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


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Exportar para uso no script.js
export { database, ref, set, get, push };

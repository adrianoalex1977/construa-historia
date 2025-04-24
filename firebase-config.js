// Importando as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get } from "firebase/database";

// Sua configuração do Firebase
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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Obtenção da instância do banco de dados
const database = getDatabase(app);

// Exportando funções para serem usadas em outros arquivos
export { database, ref, set, push, get };
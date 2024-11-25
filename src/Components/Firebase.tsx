import { initializeApp, getApps } from "firebase/app"; // Importando getApps
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVKAGbNiEiBtbA4pyjirPK1GU-jYnITf4",
  authDomain: "tarefasmais-b36d0.firebaseapp.com",
  projectId: "tarefasmais-b36d0",
  storageBucket: "tarefasmais-b36d0.firebasestorage.app",
  messagingSenderId: "341170142310",
  appId: "1:341170142310:web:c38398c706ee232c7941a7",
};

// Initialize Firebase only if it hasn't been initialized yet
let app;
if (!getApps().length) {
  // Verifica se não há aplicativos Firebase inicializados
  app = initializeApp(firebaseConfig); // Inicializa com a configuração
} else {
  app = getApps()[0]; // Usa a primeira instância existente
}

const db = getFirestore(app);

export { db };

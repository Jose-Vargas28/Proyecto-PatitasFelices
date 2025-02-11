// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importamos Firebase Auth

// Configuración de Firebase (reemplaza con tus valores específicos)
const firebaseConfig = {
  apiKey: "AIzaSyAhTdr7uisNUxeTDyQG-BjtV3LKkRB66Zg",
  authDomain: "login-auth-f1ce7.firebaseapp.com",
  projectId: "login-auth-f1ce7",
  storageBucket: "login-auth-f1ce7.firebasestorage.app",
  messagingSenderId: "716235499497",
  appId: "1:716235499497:web:04b6aa4c87327df8a54d78"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firebase Auth
const auth = getAuth(app); // Obtenemos la instancia de Firebase Auth

// Inicializar Firestore
const db = getFirestore(app); // Obtenemos la instancia de Firestore

// Exportar las funciones de Firestore y Auth
export { db, auth, collection, addDoc, getDocs, updateDoc, doc, deleteDoc, setDoc };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {

  apiKey: "AIzaSyBJ0VgVIaXnB5r2Cg9C4o78ZqBI4Z_UQhI",

  authDomain: "gmeet-clone-f9363.firebaseapp.com",

  projectId: "gmeet-clone-f9363",

  storageBucket: "gmeet-clone-f9363.appspot.com",

  messagingSenderId: "370141363903",

  appId: "1:370141363903:web:286d2b618780f2ea5cd00a"

};



  const app2= initializeApp(firebaseConfig);
  export const db = getFirestore(app2);
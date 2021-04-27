import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDi9Vh7_fuY8nXk5Mszr0XUwJW76cSEgg4",
    authDomain: "chatting-app-for-u.firebaseapp.com",
    projectId: "chatting-app-for-u",
    storageBucket: "chatting-app-for-u.appspot.com",
    messagingSenderId: "200664182113",
    appId: "1:200664182113:web:08b980b2705426fc512920",
    measurementId: "G-FKW33NZ561"
  };
  const firebaseapp=firebase.initializeApp(firebaseConfig);
  const db=firebaseapp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export{auth,provider};
  export default db;
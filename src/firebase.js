
import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyDBcL-Fr3rU38CotDahADneF4E0kjYPKkw",
    authDomain: "dsc-fire-test.firebaseapp.com",
    projectId: "dsc-fire-test",
    storageBucket: "dsc-fire-test.appspot.com",
    messagingSenderId: "250920873543",
    appId: "1:250920873543:web:5495ff91ea8e1f8e2e0b62",
    measurementId: "G-P17ZGG1EEG"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
// firebase.analytics();

const db = firebase.firestore();

export default db
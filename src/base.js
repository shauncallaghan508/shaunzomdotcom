import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdAZiwBG_GqjiBG8fowa8UiPdOx0LEdlM",
    authDomain: "darwintourney.firebaseapp.com",
    databaseURL: "https://darwintourney.firebaseio.com",
    projectId: "darwintourney",
    storageBucket: "darwintourney.appspot.com",
    messagingSenderId: "953363835008",
    appId: "1:953363835008:web:750b5ffafe5a5ffbb39e65",
    measurementId: "G-GNG1DNEJ93"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//This is a default export
export default base;
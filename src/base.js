import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDdAZiwBG_GqjiBG8fowa8UiPdOx0LEdlM",
    authDomain: "darwintourney.firebaseapp.com",
    databaseURL: "https://darwintourney.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//This is a default export
export default base;
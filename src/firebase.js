import firebase from 'firebase';
import Rebase from 're-base';

const app = firebase.initializeApp({
    apiKey: "AIzaSyCJVd54BdE__O8I4GmX03M-ZS8LATPumCY",
    authDomain: "notebook-e9a28.firebaseapp.com",
    databaseURL: "https://notebook-e9a28.firebaseio.com",
    projectId: "notebook-e9a28",
    storageBucket: "notebook-e9a28.appspot.com",
    messagingSenderId: "812175695681"
});

const base = Rebase.createClass(app.database());

export { base };

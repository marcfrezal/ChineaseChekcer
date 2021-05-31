import app from 'firebase';
import('@firebase/firestore');
import('@firebase/analytics');

var firebaseConfig = {
    apiKey: "AIzaSyA3SIVclI3MWt78pl8iQd2znnEi1CI-T-c",
    authDomain: "js-fullstack-2f41a.firebaseapp.com",
    projectId: "js-fullstack-2f41a",
    storageBucket: "js-fullstack-2f41a.appspot.com",
    messagingSenderId: "1048269524560",
    appId: "1:1048269524560:web:b00905faf5c51411818b55",
    measurementId: "G-CM347K9CMT"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);
export let database = app.firestore();


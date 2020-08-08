import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDCIhIV5aXdP5cZrdhKcpSalC6GWZRwz0E",
    authDomain: "portfolio2-5ed4d.firebaseapp.com",
    databaseURL: "https://portfolio2-5ed4d.firebaseio.com",
    projectId: "portfolio2-5ed4d",
    storageBucket: "portfolio2-5ed4d.appspot.com",
    messagingSenderId: "1049661622279",
    appId: "1:1049661622279:web:d368155c39a5a955c282a2",
    measurementId: "G-790MZ808EC"
  };

firebase.initializeApp(config);

firebase.analytics();
 
export default firebase;
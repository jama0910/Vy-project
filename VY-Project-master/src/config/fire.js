import firebase from 'firebase';

const firebaseConfig = {          // Your web app's Firebase configuration
    apiKey: "AIzaSyDCyj6oc384LoCvtfR1RUGmsNS6zJTF4So",
    authDomain: "vy-smidig-327b7.firebaseapp.com",
    databaseURL: "https://vy-smidig-327b7.firebaseio.com",
    projectId: "vy-smidig-327b7",
    storageBucket: "vy-smidig-327b7.appspot.com",
    messagingSenderId: "790916102148",
    appId: "1:790916102148:web:980b79d989307ee23f1d51",
    measurementId: "G-JQZ49T5Z9K"
  };

  const fire = firebase.initializeApp(firebaseConfig);    // Initialize Firebase
  export const db = firebase.firestore();
  export const auth = firebase.auth().currentUser;
  firebase.analytics();

  export default fire;
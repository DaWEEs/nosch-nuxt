import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'


const firebaseConfig = {
  apiKey: "AIzaSyB8l_SiqDLtgGdyu15XKrMx-dD6a62z2z4",
  authDomain: "noschmaturita.firebaseapp.com",
  projectId: "noschmaturita",
  storageBucket: "noschmaturita.appspot.com",
  messagingSenderId: "679433781162",
  appId: "1:679433781162:web:c1ec2680b5b6dd6fcf75d3",
  measurementId: "G-537VBFG0KD"
};
// Initialize Firebase
let app = null;
if (!firebase.apps.length){
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({timestampsInSnapshots: true})
}
export const db = firebase.firestore();

export default firebase;
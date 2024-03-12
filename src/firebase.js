import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8axY9Vm2c_LH5jsHvbInmkLmNG7r4TSQ",
  authDomain: "newkayit.firebaseapp.com",
  projectId: "newkayit",
  storageBucket: "newkayit.appspot.com",
  messagingSenderId: "770599569302",
  appId: "1:770599569302:web:b6e6873be9696081b5bfb7",
  measurementId: "G-G77MEKFH2J"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default app; 
export {app, firestore };
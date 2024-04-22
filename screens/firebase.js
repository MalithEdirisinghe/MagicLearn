import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB3GAVZ7NmgX8uCfJ8ubC73ZeXXOpfSlvE",
    authDomain: "magiclearn-1811d.firebaseapp.com",
    projectId: "magiclearn-1811d",
    storageBucket: "magiclearn-1811d.appspot.com",
    messagingSenderId: "483458509569",
    appId: "1:483458509569:web:8cdab33cbcabb79fdd4900"
};

// Initialize Firebase if it's not already initialized
const app = initializeApp(firebaseConfig);

// Get the Firebase Authentication instance
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firebase Storage
const storage = getStorage(app);

const db = getFirestore(app);

export { auth, db, storage };
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, addDoc, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);

export const db = getFirestore();

export const storage = getStorage();

//유저 정보 firesotre에 저장
export const createUserData = async (userData) => {
  doc(db, "users", userData.uid);
  const { displayName, email } = userData;
  const createdAt = new Date();

  try {
    await addDoc(collection(db, "users"), {
      displayName,
      email,
      createdAt,
    });
  } catch (error) {
    console.log("error caused", error.message);
  }
};

export const onAuthObserver = (callback) => 
  onAuthStateChanged(auth, callback);


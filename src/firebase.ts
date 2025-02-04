import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AzSaSyBYIJwC2k2tY3UJaEsXZo3e8niW_baS04",
  authDomain: "parking-c62c5.firebaseapp.com",
  projectId: "parking-c62c5",
  storageBucket: "parking-c62c5.appspot.com",
  messagingSenderId: "1079872155136",
  appId: "1:1079872155136:web:5a94a7745a56e7d917f2e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const updateAvailability = async (spotId: string, status: boolean) => {
  const spotRef = doc(db, "parking_spots", spotId); 
  await setDoc(spotRef, { isAvailable: status }, { merge: true });
};

export const getAvailability = async (spotId: string, callback: (status: boolean) => void) => {
  const spotRef = doc(db, "parking_spots", spotId);
  const docSnap = await getDoc(spotRef);
  
  if (docSnap.exists()) {
    callback(docSnap.data()?.isAvailable);
  } else {
    console.log("No such document!");
  }
};

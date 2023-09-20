// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyADiewqHX1eUz0Mm9XzikXZB4HKT1S_sUg",
//   authDomain: "dau-tu-chung.firebaseapp.com",
//   projectId: "dau-tu-chung",
//   storageBucket: "dau-tu-chung.appspot.com",
//   messagingSenderId: "786794538978",
//   appId: "1:786794538978:web:141b7adbb3d0bfa5113bbb",
//   measurementId: "G-21Y9JE1NX1",
// };

const firebaseConfig = {
  apiKey: "AIzaSyAuq91UhfW89ZJE9g39ZWPe4c6qbFomMk4",
  authDomain: "dau-tu-chung-khoan.firebaseapp.com",
  projectId: "dau-tu-chung-khoan",
  storageBucket: "dau-tu-chung-khoan.appspot.com",
  messagingSenderId: "659061504215",
  appId: "1:659061504215:web:89a596b0c1810b04285892",
  measurementId: "G-FKG2X9SGRE",
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
/* `const analytics = getAnalytics(app);` is initializing the Firebase Analytics service using the
Firebase app instance `app`. It retrieves the Analytics instance for the default Firebase app and
enables logging of analytics events. */
// const analytics = getAnalytics(app);

// Initialize Firebase
// let firebase_app = initializeApp(firebaseConfig);

// export default firebase_app;

// Initialize Firebase for SSR
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase services
const firestore = getFirestore(app);

const auth = getAuth(app);
// Expose the instances we'll need
export { app, firestore, auth, storage };

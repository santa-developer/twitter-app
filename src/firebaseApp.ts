// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export let app: FirebaseApp;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
// 호출할 때마다 배번 Initialize 하는게 아니라
// Initialize가 되어있으면 getAPP을 통해서 해당 앱을 가져오고
// Initialize가 안되어 있으면 Initialize를 함
try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

const firebase = initializeApp(firebaseConfig);
export default firebase;

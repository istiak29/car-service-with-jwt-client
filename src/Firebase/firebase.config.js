// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration




// const firebaseConfig = {
//     apiKey: "AIzaSyA-FaKcFlQ2JC7MuSxtHEd_P3-f_riPFoU",
//     authDomain: "car-service-2dc17.firebaseapp.com",
//     projectId: "car-service-2dc17",
//     storageBucket: "car-service-2dc17.appspot.com",
//     messagingSenderId: "185085652890",
//     appId: "1:185085652890:web:dd10a2342972fd23d41423"
// };

const firebaseConfig = {
    apiKey:import.meta.env.FIRE_CAR_APIKEY,
    authDomain:import.meta.env.FIRE_CAR_AUTHDOMAIN,
    projectId:import.meta.env.FIRE_CAR_PROJECTID,
    storageBucket:import.meta.env.FIRE_CAR_STORAGEBUCKET,
    messagingSenderId:import.meta.env.FIRE_CAR_MESSAGINGSENDERID,
    appId:import.meta.env.FIRE_CAR_APPID,
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
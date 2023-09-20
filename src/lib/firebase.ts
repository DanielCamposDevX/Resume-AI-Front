
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCRaJl713hwMEILn86IHYkFcuFLc797hNY",
    authDomain: "resume-ai-d1332.firebaseapp.com",
    projectId: "resume-ai-d1332",
    storageBucket: "resume-ai-d1332.appspot.com",
    messagingSenderId: "16422219981",
    appId: "1:16422219981:web:c32b38355952234e573984"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app)
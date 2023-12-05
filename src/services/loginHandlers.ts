import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { api } from "@/lib/axios";
import { NavigateFunction } from "react-router-dom";
import { auth } from "@/lib/firebase";



export function handleGoogleSignIn(navigate: NavigateFunction) {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((user) => {
            api.post('/user', { id: user.user.uid })
            localStorage.setItem('token', user.user.uid)
            navigate('/home')
        })
        .catch((error) => {
            alert(error)
        })
}


export function handleSimpleLogin(navigate: NavigateFunction, user: userType) {
    signInWithEmailAndPassword(auth, user.email, user.pass)
        .then((user) => {
            api.post('/user', { id: user.user.uid })
            localStorage.setItem('token', user.user.uid)
            navigate('/home')
        })
        .catch((error) => {
            alert(error)
        })
}



type userType = {
    email: string;
    pass: string;
}
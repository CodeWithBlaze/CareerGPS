import {signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut,sendPasswordResetEmail} from 'firebase/auth'
import { auth } from '../config/firebase'
async function login(email,password){
    return await signInWithEmailAndPassword(auth,email,password)
}
async function signup(email,password){
    return await createUserWithEmailAndPassword(auth,email,password);
}
async function logOut(){
    return await signOut(auth)
}
async function sendResetEmailToUser(email){
    return await sendPasswordResetEmail(auth,email)
}
export {
    login,
    signup,
    logOut,
    sendResetEmailToUser
}
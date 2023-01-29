import axios from "axios";
import { deleteUser } from "firebase/auth";
import { auth } from "../config/firebase";
import { signup } from "./auth";

const API = axios.create({
    baseURL:'http://localhost:5000'
})
API.interceptors.request.use((config)=>{
    if(auth && auth.currentUser)
        config.headers.Authorization =  auth.currentUser.accessToken
    return config
});

//post user data
async function addUsertoDatabase(userDetails){
    await signup(userDetails.email,userDetails.password)
    try{
        const result = await API.post('/user',{
                full_name:(userDetails.first_name + ' ' +userDetails.last_name),
                course:userDetails.course,
                stream:userDetails.stream,
                semester:userDetails.semester
        })
        return result.data
    }
    catch(err){
        console.log(err)
        // if signup success but database failed then delete the account
        await deleteUser(auth.currentUser)
        return new Error(err.message)
    }
}

export {
    addUsertoDatabase
}
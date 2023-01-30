import axios from "axios";
import { deleteUser } from "firebase/auth";
import { auth } from "../config/firebase";
import { signup } from "./auth";

const API = axios.create({
    baseURL:'http://localhost:5000'
})
API.interceptors.request.use((config)=>{
    if(auth && auth.currentUser)
        config.headers.Authorization =  'Bearer '+auth.currentUser.accessToken
    return config
});

//post user data
async function addUsertoDatabase(userDetails){
    await signup(userDetails.email,userDetails.password)
    try{
        const result = await API.post('/user',{
                firebase_uid:auth.currentUser.uid,
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
// get user profile
async function getProfile(){
    const result = await API.get('/user')
    return result.data
}
async function getSemestersByCourse(course,stream){
    const result = await API.get(`/category/semester?course=${course}&stream=${stream}`)
    const semesters = result.data.semesters;
    const main_goals = []
    semesters.forEach(semester=>{
        const name = semester.name
        semester.main_goals.forEach(goal=>main_goals.push({_id:goal._id,name,goal:goal.title,semester_id:semester._id}))
    })
    return main_goals
}
async function getTaskBySemesterAndGoal(semester_id,goal_id){
    const result = await API.get(`/task/${semester_id}/${goal_id}`)
    return result.data
}
export {
    addUsertoDatabase,
    getProfile,
    getSemestersByCourse,
    getTaskBySemesterAndGoal
}
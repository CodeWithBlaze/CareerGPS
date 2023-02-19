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
async function markTaskAsComplete(task_id){
    const result = await API.put('/user/task/complete',{task_id})
    return result.data
}
// get task details
async function getTaskDetails(task_id){
    const result = await API.get(`/task/details/content/${task_id}`)
    return result.data
}
//add user resume
async function addResume(resume){
    const result = await API.post('/user/add/resume',{resume})
    return result.data
}
//get user resume
async function getResume(){
    const resume = await API.get('/user/resume')
    return resume.data
}
async function updateUserProfilePhoto(photo){
    const formData = new FormData();
    formData.append('profileImage',photo);
    const result = await API.put('/user/image',formData,{
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    })
    return result.data
}
async function updateUserProfile(details){
    const document = {
        full_name:details.name,
        course:details.course,
        stream:details.stream,
        semester:details.semester
    }
    const result = await API.put('/user',document)
    return result.data
}
async function getCategories(){
    const result = await API.get('/category')
    return result.data
}
// admin api's
async function addCategory(category){
    //category must be course stream object
    const result = await API.post('/category',category)
    return result.data
}
async function updateCategory(id,course,stream){
    const result = await API.put('/category',{id,course,stream})
    return result.data
}
async function deleteCategory(id){
    await API.delete(`/category/${id}`)
}
async function getSemestersByCode(category,id=false){
    const result = await API.get(`/category/semester/code${id?`?category_id=${category}`:`?category_name=${category}`}`)
    console.log(result)
    return result.data
}
async function addASemester(code,semester_name){
    const result = await API.post('/category/semester',{code,new_semester:semester_name})
    return result.data
}
async function updateASemesterName(new_name,semester_id){
    const result = await API.put('/category/semester',{semester_id,updated_name:new_name})
    return result.data
}
async function deleteASemester(semester_id){
    await API.delete(`/category/semester/${semester_id}`)
}
async function addGoals(semester_id,goals){
    const result = await API.post('/category/goal',{semester_id,goals})
    return result.data
}
async function getAllGoalsBySemesterId(semester_id){
    const result = await API.get(`/category/goal/${semester_id}`)
    return result.data
}
async function updateGoalInDatabase(semester_id,goal_id,updated_name){
    const result = await API.put('/category/goal',{semester_id,goal_id,updated_name})
    return result.data
}
async function deleteGoalFromDatabase(semester_id,goal_id){
    await API.delete(`/category/goal/${semester_id}/${goal_id}`)
}
async function addTaskToDatabase(taskList){
    const result = await API.post('/task',{tasks:taskList})
    return result.data
}
async function updateTaskInDatabase(task_id,task){
    const result = await API.put('/task',{task_id,task})
    return result.data
}
async function removeTaskFromDatabase(task_id){
    await API.delete(`/task/${task_id}`)
}
async function getTaskByGoal(goal_id){
    const result = await API.get(`/task/details/content/goal/${goal_id}`)
    return result.data
}
async function postTaskDetails(category_id,semester_id,main_goal_id,content,belongs_to){
    const result = await API.post(`/task/details/content/`,{
        category_id,semester_id,main_goal_id,belongs_to,content,belongs_to
    })
    return result.data
}
export {
    addUsertoDatabase,
    getProfile,
    getSemestersByCourse,
    getTaskBySemesterAndGoal,
    markTaskAsComplete,
    getTaskDetails,
    addResume,
    getResume,
    updateUserProfilePhoto,
    updateUserProfile,
    getCategories,
    //admin exports
    addCategory,
    updateCategory,
    deleteCategory,
    getSemestersByCode,
    addASemester,
    updateASemesterName,
    deleteASemester,
    addGoals,
    getAllGoalsBySemesterId,
    updateGoalInDatabase,
    deleteGoalFromDatabase,
    addTaskToDatabase,
    updateTaskInDatabase,
    removeTaskFromDatabase,
    getTaskByGoal,
    postTaskDetails
}
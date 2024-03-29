import React, { useContext, useEffect, useState } from 'react';
import { getProfile, getSemestersByCourse, getTaskDetails } from '../backend/api';
import Button from '../components/Button';
import CircularImage from '../components/CircularImage';
import CustomHTML from '../components/CustomHTML';
import Navbar from '../components/Navbar';
import TaskCategory from '../components/TaskCategory';
import TrackBox from '../components/TrackBox';
import UserContext from '../context/UserContext';
import Confetti from 'react-confetti'
import '../css/main_app.css';
import { Spinner } from 'react-activity';
import { useNavigate } from 'react-router-dom';
import profile_photo from '../asset/profile_image.png';
import useMediaQuery from '../hooks/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';


function UserProfile({profile,user}){
  const navigate = useNavigate()  
  return (
    <div className='dashboard-profile'>
            {!profile && <Spinner/>}
            {profile && user && <>
            <CircularImage img={profile.profile_image || profile_photo}/>
            <h3 className='dashboard-profile-name'>{profile.full_name}</h3>
            <label className='dashboard-profile-email'>{user.email}</label>
            <Button title='View Profile' customClass={'dashboard-profile-btn'}
            onClick={()=>navigate('/profile',{state:{profile}})}
            />
            {/* <TrackBox text={'Topic Progress: On Track'} progress={32}/> */}
            {/* <TrackBox text={'Semester Progress: On Track'} progress={52}/> */}
            </>}
    </div>
  )
}
function TaskDashboard({goals,activeTask,setActiveTask,setCurrentTask,currentTask}){
  return(
    <div className='dashboard-task'>
            {
              goals.length > 0 && activeTask.length > 0 &&
              goals.map(goal=>
              <TaskCategory
              activeTask={activeTask}
              setActiveTask={setActiveTask} 
              key={goal._id} 
              heading={goal.goal} 
              subheading={goal.name} 
              goal_id={goal._id} 
              semester_id={goal.semester_id} 
              setTask={setCurrentTask} 
              currentTask={currentTask}/>)
            }
      </div>
  )
}

function Journey(props) {
    const [profile,setProfile] = useState(null)
    const [goals,setGoals] = useState([])
    const {user,setUser} = useContext(UserContext);
    const [currentTask,setCurrentTask] = useState(null); 
    const [currentTaskContent,setCurrentTaskContent] = useState(null); 
    const [celebrate,setCelebrate] = useState(false);
    const [activeTask,setActiveTask] = useState([])
    //check for mobile
    const isMobile = useMediaQuery('(max-width: 450px)')  
    // opening and closing state for mobile
    const [isProfileOpen,setIsProfileOpen] = useState(false);
    const [isTaskOpen,setIsTaskOpen] = useState(false);
    useEffect(()=>{
      if(user)
        getProfile()
        .then(data=>{
          setProfile(data.user)
          setActiveTask(data.activeTask)
          // fetch task
          getSemestersByCourse()
          .then(goals=>setGoals([...goals]))
          .catch(err=>console.log(err))
          setUser({...user,profileData:data.user,activeTaskData:data.activeTask})
          
        })
        .catch(err=>console.log(err))
    },[])
    useEffect(()=>{
      const lockedContentHTML = `
      <div style="height:100%;display:flex;justify-content:center;align-items:center;flex-wrap:wrap;">
      <img style="width:150px;height:150px;" src="https://res.cloudinary.com/codecafe/image/upload/v1680409685/CareerGPS/lock_mg9cj5.png">
      <h1 style="margin-left:15px;margin-top:30px;text-align:center;">This content is still locked. Complete previous task to unlock this content</h1>
      </div>`;
      if(currentTask){
        setCurrentTaskContent(null);
        getTaskDetails(currentTask)
        .then(res=>setCurrentTaskContent(res.content))
        .catch(err=>{
          if(err.response.status === 403)
              setCurrentTaskContent(lockedContentHTML)
          else
              setCurrentTaskContent('<h1>No Content Found</h1>')
        })
        
      }
    },[currentTask])
    useEffect(()=>{
      if(!isMobile){
        setIsProfileOpen(true);
        setIsTaskOpen(true)
      }
      
    },[isMobile])
    return (
        <>
        <Navbar activeMenu='My Journey'/>
        <div className='main-app-container'>
          {isMobile && <div className='Opener' onClick={()=>setIsProfileOpen(!isProfileOpen)}>
            <FontAwesomeIcon icon={isProfileOpen?faCaretDown:faCaretRight}/>
            <h3>Profile</h3>
          </div>}
          {isProfileOpen && <UserProfile profile={profile} user={user}/>}
          {isMobile && <div className='Opener' onClick={()=>setIsTaskOpen(!isTaskOpen)}>
            <FontAwesomeIcon icon={isTaskOpen?faCaretDown:faCaretRight}/>
            <h3>Tasks</h3>
          </div>}
          {isTaskOpen && <TaskDashboard 
          goals={goals}
          activeTask={activeTask}
          setActiveTask={setActiveTask}
          setCurrentTask={setCurrentTask}
          currentTask={currentTask}
          />}
          
          <div className='dashboard-task-details'>
            {!currentTask && <p className="no-details-heading">Click on a task to show the Task details</p>}
            { currentTask && !currentTaskContent && <Spinner/>} 
            { currentTask && currentTaskContent && <CustomHTML 
            setActiveTask={setActiveTask}
            content={`
            <div id="custom_html">
            ${currentTaskContent}
            </div>
            `
            } 
            task_id={currentTask}
            setCelebrate={setCelebrate}
            taskContent={currentTaskContent}
            />}
          </div>
        </div>
        {
          celebrate && <div className='celebration'>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            onConfettiComplete={()=>setCelebrate(false)}
            recycle={false}
            numberOfPieces={1000}
            initialVelocityY={10}
          />
          </div>
        }
        </>
    );
}

export default Journey;
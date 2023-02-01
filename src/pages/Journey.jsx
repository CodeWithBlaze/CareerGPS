import React, { useContext, useEffect, useState } from 'react';
import { getProfile, getSemestersByCourse } from '../backend/api';
import Button from '../components/Button';
import CircularImage from '../components/CircularImage';
import CustomHTML from '../components/CustomHTML';
import Navbar from '../components/Navbar';
import TaskCategory from '../components/TaskCategory';
import TrackBox from '../components/TrackBox';
import UserContext from '../context/UserContext';
import Confetti from 'react-confetti'
import '../css/main_app.css';
function Journey(props) {
    const [profile,setProfile] = useState(null)
    const [goals,setGoals] = useState([])
    const {user,setUser} = useContext(UserContext);
    const [currentTask,setCurrentTask] = useState(null); 
    const [celebrate,setCelebrate] = useState(false);
    const [activeTask,setActiveTask] = useState([])
    useEffect(()=>{
      getProfile()
      .then(data=>{
        setProfile(data.user)
        setActiveTask(data.activeTask)
        // fetch task
        getSemestersByCourse(data.user.course,data.user.stream)
        .then(goals=>setGoals([...goals]))
        .catch(err=>console.log(err))
        setUser({...user,profileData:data.user,activeTaskData:data.activeTask})
        
      })
      .catch(err=>console.log(err))
    },[])
    return (
        <>
        <Navbar activeMenu='My Journey'/>
        <div className='main-app-container'>
          <div className='dashboard-profile'>
            {profile && user && <>
            <CircularImage img={'https://bharatflux.com/wp-content/uploads/2020/04/IMG-20200404-WA0003.jpg'}/>
            <h3 className='dashboard-profile-name'>{profile.full_name}</h3>
            <label className='dashboard-profile-email'>{user.email}</label>
            <Button title='View Profile' customClass={'dashboard-profile-btn'}/>
            <TrackBox text={'Topic Progress: On Track'} progress={32}/>
            <TrackBox text={'Semester Progress: On Track'} progress={52}/>
            </>}
          </div>
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
          <div className='dashboard-task-details'>
            {!currentTask && <p className="no-details-heading">Click on a task to show the Task details</p>}
            { currentTask && <CustomHTML 
            setActiveTask={setActiveTask}
            content={"This string contains <b>HTML</b> and will safely be rendered!"} 
            task_id={currentTask}
            setCelebrate={setCelebrate}
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
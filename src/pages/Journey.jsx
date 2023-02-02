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
            content={`
            <div id="custom_html">
            <h1 id="2268766286786035110206696206553.98" class="article-element common-style" style="font-size: 35px;">What the Recent Breakthrough in Fusion Power Could Mean for You</h1><h3 id="82221155129577312001568465734773.2" class="article-element common-style" style="color: grey; font-weight: 500;">Cleaner, cheaper energy might one day be possible if it ever takes off</h3><p id="1936010920197930.28112191084305975" class="article-element common-style" style="color: grey;">By Sascha Brodsky Published on December 23, 2022 01:00PM EST</p><img id="251260073436774.254048479275369654" class="article-element image-default" src="https://www.lifewire.com/thmb/03EB829VX0pc1jJyo7bNic5CsOw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-96615111-fe3f2b4b05b14c08a383975e68d348b4.jpg" style="margin-top: 15px;"><p id="97231277981606066344908631667641" class="article-element common-style" style="font-weight: 500;">Fusion power on earth is getting closer to reality, but some experts say it won't be powering your laptop anytime soon.<br class=""><br class="">The US Department of Energy recently announced that scientists have, for the first time, produced a nuclear fusion reaction resulting in a net energy gain. Fusion power could eventually make clean, cheap energy and even help save the environment; however, there are still major significant challenges before that happens.<br class=""><br class="">"For the last 60 years, when experts were asked about when fusion will become possible, the typical answer was within 20-30 years," Yaron Danon, the director of the nuclear engineering program at Rensselaer Polytechnic Institute, told Lifewire in an email interview. "Even after the latest discovery, the answer to this question is the same; it is still very difficult to scale this (or other) fusion energy production methods up."</p><h2 id="69993971738507433883060748536306.5" class="article-element common-style">The Power of Stars</h2><p id="70729843677525353737665379145733.5" class="article-element common-style" style="font-weight: 500;">o produce the latest fusion reaction, researchers at the U.S. National Ignition Facility used 192 lasers to deliver 2.05 megajoules of energy onto a pea-sized gold cylinder containing a frozen pellet of the hydrogen isotopes deuterium and tritium. The energy caused the capsule to collapse and create fusion reactions. A later analysis found that the reaction released some 3.15 megajoules of energy which is about 5 percent more than the energy that went into the reaction and more than double the previous record of 1.3 megajoules.<br class=""><br class="">"We have had a theoretical understanding of fusion for over a century, but the journey from knowing to doing can be long and arduous. Today's milestone shows what we can do with perseverance," Arati Prabhakar, the director of the White House Office of Science and Technology Policy, said in the news release. </p><iframe id="50117650426623867650351015728190" class="article-element common-style embed-default embed-dev-pad" src="https://www.youtube.com/embed/HfP-eFbdrjM"></iframe><h1 id="45790747138399775637003956732545" class="article-element common-style" style="font-style: italic; font-size: 40px;">The challenges of putting the sun in a bottle are extreme.</h1><a id="72690297121322983000079018586525.5" class="article-element common-style" href="https://www.lifewire.com/what-the-recent-breakthrough-in-fusion-power-could-mean-for-you-6891823" target="_blank" style="font-style: italic;">Link to actual article</a>
            </div>
            `
            } 
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
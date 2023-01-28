import React from 'react';
import Button from '../components/Button';
import CircularImage from '../components/CircularImage';
import CustomHTML from '../components/CustomHTML';
import Navbar from '../components/Navbar';
import TaskCategory from '../components/TaskCategory';
import TrackBox from '../components/TrackBox';
import '../css/main_app.css';
function Journey(props) {
    return (
        <>
        <Navbar activeMenu='My Journey'/>
        <div className='main-app-container'>
          <div className='dashboard-profile'>
            <CircularImage img={'https://bharatflux.com/wp-content/uploads/2020/04/IMG-20200404-WA0003.jpg'}/>
            <h3 className='dashboard-profile-name'>Nancy Momoland</h3>
            <label className='dashboard-profile-email'>nancymomoland@gmail.com</label>
            <Button title='View Profile' customClass={'dashboard-profile-btn'}/>
            <TrackBox text={'Topic Progress: On Track'} progress={32}/>
            <TrackBox text={'Semester Progress: On Track'} progress={52}/>
          </div>
          <div className='dashboard-task'>
            <TaskCategory heading={'Learn a Language'} subheading={'Semester 1'}/>
          </div>
          <div className='dashboard-task-details'>
            <CustomHTML content={"This string contains <b>HTML</b> and will safely be rendered!"}/>
          </div>
        </div>
        </>
    );
}

export default Journey;
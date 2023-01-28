import React, { useLayoutEffect } from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ColorContainer from '../components/ColorContainer';
import ImgHeading from '../components/ImgHeading';
import LogoText from '../components/LogoText';
import MainHeadings from '../components/MainHeadings';
import Navbar from '../components/Navbar';
import { believed_emoji, confuse_emoji, dizzy_emoji,taskUrl } from '../config/constant';
import { color_container } from '../css/custom';
import '../css/page/home.css'
import '../css/page/common.css'
import { faLightbulb,faFile,faHandSpock,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap';
import { activateHomeAnimations, changeBackgroundColor, changeOutineColor, changeScale, changeTextColor} from '../animations/HomeAnimation';
import {ScrollTrigger} from 'gsap/all';
import { useNavigate } from 'react-router-dom';
//registering scrollTrigger
gsap.registerPlugin(ScrollTrigger)

function Home(props) {
    const navigate = useNavigate()
    useLayoutEffect(()=>{
       activateHomeAnimations()
    },[])
    
    return (
        <>
            <Navbar activeMenu='Home'/>
            <ColorContainer customStyle={color_container}>
                <ImgHeading
                customMainHeadingContainerStyle={{width:'50%'}}
                subtitle_id={'section1-subheading'}
                title_id={'section1-heading'}
                img_id={'section-1-img'}
                heading={<label>Follow the 
                <span 
                id='blue-heading' 
                onMouseEnter={()=>changeTextColor('#blue-heading','orange',65,0.5)}  
                onMouseLeave={()=>changeTextColor('#blue-heading','#518BFA',60,0.5)}
                style={{color:'var(--blue)'}}> absolute</span> road to <span id='blue-heading' onMouseEnter={()=>changeTextColor('#blue-heading','orange',65,0.5)}  onMouseLeave={()=>changeTextColor('#blue-heading','#518BFA',60,0.5)} style={{color:'var(--blue)'}}>success</span></label>}
                subheading={'A little learning each day converts to bigger result. Complete small task each day and be super prepared for placement.'}
                customSubheadingStyle={{width:'80%'}}
                >
                    <div className='btn-container'>
                        <Button
                        id="get-started"  
                        title='Get Started' 
                        customStyle={{width:180,marginRight:15}}
                        onMouseEnter={()=>changeBackgroundColor('#get-started','orange',0.5)}
                        onMouseLeave={()=>changeBackgroundColor('#get-started','#518BFA',0.5)}
                        onClick={()=>navigate('/register/signup')}
                        />
                        <Button 
                        title='Login Here' 
                        id="login"
                        customStyle={{width:180}} 
                        onMouseEnter={()=>changeOutineColor('#login','orange',false,'white',0.5)}
                        onMouseLeave={()=>changeOutineColor('#login','#518BFA',true,'#518BFA',0.5)}
                        onClick={()=>navigate('/register')}
                        outline/>
                    </div>
                </ImgHeading>
            </ColorContainer>
            <section className='container'>
                <div className='title-emoji-container'>
                    <h1 className='title-text'>Does this seems familiar...</h1>
                    <img src={believed_emoji} alt={'beleived sad emoji'}/>
                </div>
                <div className='card-container'>
                <Card
                id={'card-1'}
                onMouseEnter={()=>changeScale('#card-1',1.1)}
                onMouseLeave={()=>changeScale('#card-1',1)}
                title="Learned something but don’t know what to do next"
                description="Don’t know how to figure out the next thing that is to be learned"
                img = {confuse_emoji}
                color={'#BDD0FB'}
                />
                <Card
                id={'card-2'}
                onMouseEnter={()=>changeScale('#card-2',1.1)}
                onMouseLeave={()=>changeScale('#card-2',1)}
                title="Don’t know what to learn outside of college syllabus"
                description="College syllabus is never enough to land a internship or job. Know what to learn outside of college "
                img = {dizzy_emoji}
                color={'#FBE7B5'}
                />
                <Card
                id={'card-3'}
                onMouseEnter={()=>changeScale('#card-3',1.1)}
                onMouseLeave={()=>changeScale('#card-3',1)}
                title="Don’t know how to apply for intership"
                description="Don’t know how to use your knowledge to apply for internship. We are there to help"
                img = {dizzy_emoji}
                color={'#D2CEFF'}
                />
                </div>
            </section>
            <section className='heading-subheading'>
                <MainHeadings 
                    customContainerStyle={{textAlign:'center'}}
                    title_id={'section-3-heading'}
                    subtitle_id={'section-3-subheading'}
                    title={<label>What can <span style={{color:'var(--blue)'}}>you</span> do with <span style={{color:'var(--blue)'}}>us</span></label>}
                    customHeadingStyle={{fontSize:35}}
                    subtitle={'Here is a secret, you can start for absolute free'}
                    customSubheadingStyle={{fontSize:20,marginRight:0}}
                />
                <ColorContainer customStyle={color_container}>
                    <ImgHeading 
                    img={taskUrl} 
                    img_id={'task'}
                    customContainerStyle={{flexDirection:'row-reverse',justifyContent:'space-evenly'}}
                    customMainHeadingContainerStyle={{width:'fit-content'}}
                    >
                        <LogoText
                        id={'section-3-card-1'}
                        icon={faLightbulb} 
                        text={'Learn each day followed by solving question'}/>
                        <LogoText
                        id={'section-3-card-2'}
                        icon={faFile} 
                        text={'Automated digital resume creation as learning progress'}/>
                        <LogoText
                        id={'section-3-card-3'}
                        icon={faHandSpock} 
                        text={'Step by step learning including interview preparation'}/>
                        <LogoText
                        id={'section-3-card-4'}
                        icon={faLayerGroup} 
                        text={'Apply everywhere from one platform'}/>
                        
                    </ImgHeading>
                </ColorContainer>
            </section>
            <section className='home-info container' >
                <h1 id='section-4-heading'>Be at your best when facing the interview</h1>
                <p id='section-4-paragraph-1'>we provide roadmap that is pratical,concise and easy to follow</p>
                <p id='section-4-paragraph-2'>you will have all the practical personality,reasoning skills that is required</p>
            </section>
            <section className='container'>
                <ColorContainer customStyle={{backgroundColor:'var(--light-purple)'}}>
                    <MainHeadings 
                        customContainerStyle={{display:'flex',flexDirection:'column-reverse',alignItems:'center'}}
                        title={'We plan things for you, so that you can focus on learning'}
                        title_id={'section-5-heading'}
                        customHeadingStyle={{fontSize:35}}
                        subtitle_id={'section-5-subheading'}
                        subtitle={'Try us for free'}
                        customSubheadingStyle={{fontSize:30,marginRight:0,marginBottom:15}}
                    />
                    <div className='white-board'>
                        <img src="https://res.cloudinary.com/codecafe/image/upload/v1674279699/CareerGPS/Group_22_fzvdvz.png"
                        className='img-goal' alt='your goal'
                        />
                    </div>
                </ColorContainer>
            </section>
        </>
    );
}

export default Home;
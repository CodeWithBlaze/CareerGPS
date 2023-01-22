import React from 'react';
import Button from '../components/Button';
import Card from '../components/Card';
import ColorContainer from '../components/ColorContainer';
import ImgHeading from '../components/ImgHeading';
import LogoText from '../components/LogoText';
import MainHeadings from '../components/MainHeadings';
import Navbar from '../components/Navbar';
import { believed_emoji, confuse_emoji, dizzy_emoji, roadImgUrl, taskUrl } from '../config/constant';
import { color_container } from '../css/custom';
import '../css/page/home.css'
import { faLightbulb,faFile,faHandSpock,faLayerGroup } from '@fortawesome/free-solid-svg-icons'
function Home(props) {
    return (
        <>
            <Navbar/>
            <ColorContainer customStyle={color_container}>
                <ImgHeading
                customMainHeadingContainerStyle={{width:'50%'}}
                heading={<label>Follow the <span style={{color:'var(--blue)'}}>absolute</span> road to <span style={{color:'var(--blue)'}}>success</span></label>}
                subheading={'A little learning each day converts to bigger result. Complete small task each day and be super prepared for placement.'}
                customSubheadingStyle={{width:'80%'}}
                img={roadImgUrl}
                >
                    <div className='btn-container'>
                        <Button title='Get Started' customStyle={{width:180,marginRight:15}}/>
                        <Button title='Login Here' customStyle={{width:180}} outline/>
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
                title="Learned something but don’t know what to do next"
                description="Don’t know how to figure out the next thing that is to be learned"
                img = {confuse_emoji}
                color={'#BDD0FB'}
                />
                <Card
                title="Don’t know what to learn outside of college syllabus"
                description="College syllabus is never enough to land a internship or job. Know what to learn outside of college "
                img = {dizzy_emoji}
                color={'#FBE7B5'}
                />
                <Card
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
                    title={<label>What can <span style={{color:'var(--blue)'}}>you</span> do with <span style={{color:'var(--blue)'}}>us</span></label>}
                    customHeadingStyle={{fontSize:35}}
                    subtitle={'Here is a secret, you can start for absolute free'}
                    customSubheadingStyle={{fontSize:20,marginRight:0}}
                />
                <ColorContainer customStyle={color_container}>
                    <ImgHeading 
                    img={taskUrl} 
                    customContainerStyle={{flexDirection:'row-reverse',justifyContent:'space-evenly'}}
                    customMainHeadingContainerStyle={{width:'fit-content'}}
                    >
                        <LogoText
                        icon={faLightbulb} 
                        text={'Learn each day followed by solving question'}/>
                        <LogoText
                        icon={faFile} 
                        text={'Automated digital resume creation as learning progress'}/>
                        <LogoText
                        icon={faHandSpock} 
                        text={'Step by step learning including interview preparation'}/>
                        <LogoText
                        icon={faLayerGroup} 
                        text={'Apply everywhere from one platform'}/>
                        
                    </ImgHeading>
                </ColorContainer>
            </section>
            <section className='home-info container' >
                <h1>Be at your best when facing the interview</h1>
                <p>we provide roadmap that is pratical,concise and easy to follow</p>
                <p>you will have all the practical personality,reasoning skills that is required</p>
            </section>
            <section className='container'>
                <ColorContainer customStyle={{backgroundColor:'var(--light-purple)'}}>
                    <MainHeadings 
                        customContainerStyle={{display:'flex',flexDirection:'column-reverse',alignItems:'center'}}
                        title={'We plan things for you, so that you can focus on learning'}
                        customHeadingStyle={{fontSize:35}}
                        subtitle={'Try us for free'}
                        customSubheadingStyle={{fontSize:30,marginRight:0,marginBottom:15}}
                    />
                    <div className='white-board'>
                        <img src="https://res.cloudinary.com/codecafe/image/upload/v1674279699/CareerGPS/Group_22_fzvdvz.png"
                        className='img-goal'
                        />
                    </div>
                </ColorContainer>
            </section>
        </>
    );
}

export default Home;
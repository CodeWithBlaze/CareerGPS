import gsap from "gsap";

export function changeBackgroundColor(target,toColor='black',duration=1){
    gsap.to(target,{backgroundColor:toColor,duration})
}
export function changeTextColor(target,toColor,scale,duration=1){
    gsap.to(target,{color:toColor,duration,fontSize:scale})
}
export function changeOutineColor(target,toColor='black',transparent=false,textColor='white',duration=1){
    gsap.to(target,
        {backgroundColor:!transparent?toColor:'transparent',
        color:textColor,
        borderColor:transparent?textColor:toColor,
        duration})
}
export function changeScale(target,scale){
    gsap.to(target,{scale:scale})
}

// all home animations
export function activateHomeAnimations(){
    //navbar
    gsap.fromTo('.logo',{y:-50,opacity:0},{y:0,opacity:1,duration:1})
     // timeline animation
     const tl = gsap.timeline({duration:1})
     tl.fromTo('#section-1-img',{y:150,opacity:0},{y:0,opacity:1})
     tl.fromTo('#section1-heading',{x:-150,opacity:0},{x:0,opacity:1,duration:0.5},'<')
     tl.fromTo('#section1-subheading',{x:150,opacity:0},{x:0,opacity:1})
     tl.fromTo('.btn-container',{y:150,opacity:0},{y:0,opacity:1})
     // card trigger animation
     const tl2 = gsap.timeline({
         scrollTrigger:'.title-emoji-container'
     })
     tl2.fromTo('.title-emoji-container',{x:-150,opacity:0},{x:0,opacity:1,duration:0.5})
     tl2.fromTo('#card-1',{y:150,opacity:0},{y:0,opacity:1,duration:1})
     tl2.fromTo('#card-2',{y:150,opacity:0},{y:0,opacity:1,duration:1},'<30%')
     tl2.fromTo('#card-3',{y:150,opacity:0},{y:0,opacity:1,duration:1},'<30%')
     // section 3 triigers
     const tl3 = gsap.timeline({
         scrollTrigger:'#section-3-heading'
     })
     tl3.fromTo('#section-3-heading',{y:150,opacity:0},{y:0,opacity:1})
     tl3.fromTo('#section-3-subheading',{y:150,opacity:0},{y:0,opacity:1})
     tl3.fromTo('#task',{y:150,opacity:0},{y:0,opacity:1,duration:1})
     tl3.fromTo('#section-3-card-1',{x:-150,opacity:0},{x:0,opacity:1},'<')
     tl3.fromTo('#section-3-card-2',{x:-150,opacity:0},{x:0,opacity:1},'<30%')
     tl3.fromTo('#section-3-card-3',{x:-150,opacity:0},{x:0,opacity:1},'<30%')
     tl3.fromTo('#section-3-card-4',{x:-150,opacity:0},{x:0,opacity:1},'<30%')
     //section 4
     const tl4 = gsap.timeline({
         scrollTrigger:'#section-4-heading'
     })
     tl4.fromTo('#section-4-heading',{opacity:0,x:-150},{opacity:1,x:0,duration:1})
     tl4.fromTo('#section-4-paragraph-1',{opacity:0,y:150},{opacity:1,y:0,duration:1},'<20%')
     tl4.fromTo('#section-4-paragraph-2',{opacity:0,y:150},{opacity:1,y:0,duration:1},'<20%')
     const tl5 = gsap.timeline({
         scrollTrigger:'#section-5-heading'
     })
     tl5.fromTo('#section-5-subheading',{opacity:0,y:150},{opacity:1,y:0,duration:0.5},)
     tl5.fromTo('#section-5-heading',{opacity:0,y:150},{opacity:1,y:0,duration:0.5})
     tl5.fromTo('.img-goal',{opacity:0,y:150},{opacity:1,y:0,duration:1},'<')
}
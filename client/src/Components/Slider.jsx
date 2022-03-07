import { ArrowForward ,ArrowRight, ArrowLeft} from '@material-ui/icons'
import React,{useState} from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import {sliderItems} from "../data"
import {MD, SM, XS} from "../responsive"

const Container = styled.div`
height: 85vh;
width: 100%;
display: flex;
align-items: center;
position: relative;
overflow:hidden;
/* left:0;
right:0; */
${SM({height:"55vh"})}
${XS({height:"40vh"})}


`
const Wrapper = styled.div`

display: flex;
transform: translateX(${(props) => props.slideNum * -100}vw);
transition: all .8s ease-in;
`
const Slide = styled.div`
width: 100vw;
height: 85vh;
display: flex;
align-items: center;
background-color: #${(props)=>props.bc};
position: relative;
${SM({display:"none"})}
`
const Slide2 = styled.div`
width: 100vw;
height: 55vh;
display: none;
align-items: center;
background-color: #${(props)=>props.bc};
position: relative;
${SM({display:"flex"})}
${XS({height:"40vh"})}
`
const Arrow = styled.span`
width: 40px;
height: 40px;
background-color: #eeeeee82;
border: none;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
opacity: .6;
cursor: pointer;
position: absolute;
right:${(props)=>props.direction === "right" && "15px"};
left:${(props)=>props.direction === "left" && "15px"};
z-index: 2;
svg{color:#5b5b5b}
&:hover{
opacity: 1;
transform: scale(1.1);
}
${SM({width:"35px",height:"35px"})}
`

const ImageContainer = styled.div`

height: 100%;
display: flex;
/* padding-left:1.5rem; */
${MD({padding:"0",width:"100%"})}

`
const Image = styled.img`
// width: 70%;
object-fit: cover;
${MD({width:"100%"})}
`
const Video = styled.video`
width: 100%;
height: 100%;
object-fit: cover;
`
const Info = styled.div`
position: absolute;
right: 6%;
max-width: 37%;

${MD({maxWidth:"42%"})}

`
const Title = styled.h2`
font-weight: 400;
font-size: 3rem;
margin: 15px 0;

`
const Desc = styled.p`
margin: 25px 0 ;
font-weight : 400;
letter-spacing: 4px;
font-size: 1rem;
max-width:100%;


`
const Btn = styled.div`
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    position:absolute;
    right: 10px;
    font-size: 18px;
    background-color: #464646;
    color: #fff;
    border: none;
    cursor: pointer;
    padding: 9px 18px;
    bottom: -70px;
    border-radius: 22px;
    overflow: hidden;
    width: 118px;
 
     /* svg{padding-left:6px;} */
    ::after{
        content: '';
        border-top: 2px solid #fff;
        border-bottom: 1px solid #fff;
        width: 250px;
        height: 15px;
        position: absolute;
        z-index: 3;
        transform: rotate(22deg);
        top: 0;
        right: -170px;
        -webkit-box-shadow: 5px -5px 11px -4px #FFFFFF; 
         box-shadow: 5px -5px 11px -4px #FFFFFF;

    }

    :hover::after{
       transition:right 1s cubic-bezier(.9,.03,.69,.22);
       right:190px;
       
    }
  
`


const Slider = () => {
    const [slideNum, setSlideNum] = useState(0);
    const [slideShow, setSlideShow] = useState(true);

    const maxSlide=sliderItems.length;

    const handleClick=(dir)=>{
        if(dir==="right"){
            setSlideNum(slideNum < maxSlide-1 ? slideNum+1 : 0);
            
        }else{
            setSlideNum(slideNum > 0  ? slideNum-1 : maxSlide-1);
        }
        setSlideShow(false)
        
    }

   

      useEffect(() => {
          const time=slideShow ? 3000 : 9000 ;
       const text=setTimeout(() => {
            setSlideNum((slideNum) => slideNum < maxSlide-1 ? slideNum+1 : 0);
            !slideShow && setSlideShow(true)
        }, time);
         
        return () =>clearTimeout(text);
        
      });
 
    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeft />
                </Arrow>

                <Wrapper slideNum={slideNum}>

{sliderItems.map((s)=>(
            <Slide key={s.id} bc={s.bg}>
                <ImageContainer>
            <Image src={s.img} />
            </ImageContainer>


            <Info>
                <Title>{s.title}</Title>
                <Desc>{s.desc}</Desc>
                <Btn type={s.btn}><b>SHOP </b>  NOW 
                    <ArrowForward />

                </Btn>
            </Info>

            </Slide>
            ))}
            
{sliderItems.map((s)=>(
            <Slide2 key={s.id} bc={s.bg}>
            

                    {s.ResImg ?
                    < ImageContainer>
                     <Image src={s.ResImg} />
                     </ImageContainer>:
                    <Video src={s.vid} autoPlay={true} loop />
                    }

            {/* <Info>
                <Title className='font-roman'>{s.title}</Title>
                <Desc className='font-roman'>{s.desc}</Desc>
                <Btn type={s.btn}>SHOP NOW 
                    <ArrowForward />

                </Btn>
            </Info> */}

            </Slide2>
            ))}

            </Wrapper>

            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRight />
                </Arrow>
            
        </Container>
    )
}

export default Slider
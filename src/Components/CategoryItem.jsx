import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {XS,SM} from "../responsive"


const Container = styled.div`
flex-grow:1;
height:260px;
margin: 8px;
position: relative;
border-radius: 4px;
overflow: hidden;
background-color:${(props)=>props.bc};
/* padding-left: 15px; */
display:flex;
justify-content:${(props)=>props.type === "left" ? "start" : "end"};
${SM({width:"50%"})};
${XS({width:"95%"})}

`
const Wrapper = styled.div`
height:100%;
`

const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Info = styled.div`

position: absolute;
top:35px;
right:${(props)=>props.type === "left" && "0"};
left:${(props)=>props.type !== "left" && "10px"};
width: ${(props)=>props.type === "left" ? "45%" : "50%"};
flex-direction: column;


`

const Title = styled.h2`
font-size: 2rem;
font-weight: 600;
z-index:4;
${SM({fontSize:"2.3rem"})}
${XS({fontSize:"1.8rem"})}

`
const Text = styled.h5`
font-weight: 500;
z-index:4;
padding-top: 11px;


`
const Btn = styled.button`
padding: 10px;
position:absolute;
right:0;
bottom:0;
border: none;
background:none;
color:#000000;
text-decoration:underline;
  cursor: pointer;
font-weight: 700;

`
const CategoryItem2 = ({item}) => {
    return (
        <Container bc={item.bc && item.bc} type={item.id===1 && "left"}>
          
                <Wrapper>

                     <Image src={item.img} />:
                   
           
            <Info type={item.id===1 && "left"}>
                <Title>{item.title}</Title>
                <Text>{item.desc}</Text>
               
            </Info>
            </Wrapper>
         
            <Btn>  <Link to="/products">SHOP NOW</Link></Btn>
            
        </Container>
    )
}

export default CategoryItem2

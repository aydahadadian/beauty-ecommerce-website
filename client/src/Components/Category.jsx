import React from 'react'
import styled from 'styled-components'
import {XS,SM} from "../responsive"
import CategoryItem from './CategoryItem'
import Cards from './Cards'



const Container = styled.div`
display: flex;
margin: 1vh 10px;
justify-content: center;
flex-direction:column;
${XS({flexDirection:"column"})}
`
const Wrapper = styled.div`
display:flex;;
align-items:center;
justify-content:center;
width:100%;
${SM({flexWrap:"wrap"})}

`

const Title = styled.h2`
font-size:2rem;
font-weight: 300;
padding: 15px 30px;

::after{
    content: '';
    width: 40%;
    height: 1px;
    background-color: #eee;
    display: block;
    ${XS({width:"100%"})}

}
${XS({textAlign:"center",fontSize:"1.7rem"})}
`
// const Left = styled.div`
// flex:2;
// display:flex;
// flex-wrap:wrap;
// height:95%;
// align-items:center;
// margin-right:5px;
// `
// const Right = styled.div`
// flex:1;
// height:95%;
// padding:5px 0 ;
// position:relative;

// `

const Image=styled.img`

object-fit: cover; 
height:100%;
width:100%;
border-radius: 3px;
`

const Info = styled.div`

position: absolute;
bottom:0;
display: flex;
justify-content: center;
align-items: center;
z-index: 3;
width: 100%;
background-color: #3a3a3a68;
height:15%;
transition: all .1s ease-in;

`


const Category = ({data,type}) => {
    
    
    return (
        <Container type={type==="category" && "default"}>
            
     {type==="category" ?
            <>
            <Title>Shop by categories</Title>     
            <Wrapper>
            {data.map((item) => (

            <Cards key={item.id} item={item}/>

            ))
            }
            </Wrapper>

            </>
       
           
             :
            
             <Wrapper>
             {data.map((item) => (
 
             <CategoryItem key={item.id} item={item}/>
 
             ))
             }
             </Wrapper>

        }
          
           

        </Container>
    )
}

export default Category

import { Clear } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { SM } from '../responsive'

const Container=styled.div`
padding: 1rem;
min-height: 420px;


`
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;

`

const Title=styled.h2`
    margin-bottom:1rem;
`
const Box=styled.div`
padding:15px 25px;
-webkit-box-shadow: 2px 0px 7px 0px #D2D2D2; 
box-shadow: 2px 0px 7px 0px #D2D2D2;
margin:1rem;
width:100%;
display:flex;
flex-wrap:wrap;
${SM({width:"100%"})}
`
const Row=styled.div`
width:43%;
display:flex;
flex-direction:column;
margin:10px 25px 10px 10px;
${SM({width:"100%"})}

`

const InformTitle=styled.span`
margin-right:10px;
font-weight:500;
padding-bottom: 10px;

`
const Input=styled.input`
padding:  10px;
border: 1px solid #b4b4b4;

`
const Button=styled.button`
padding:10px;
margin:20px 10px 10px;
border:none;
color:#fff;
background-color:#003c8b;
border-radius:4px;
font-weight: 500;
font-size: 1rem;
cursor:pointer;
max-width:150px;
:hover{
    background-color:#7a9fce;
}
`


const UserAddresses = () => {

    return (
        <Container>
            <Title>Your Addresses</Title>
            
          
            <Wrapper>
                
           <Box>
            
            <Row><InformTitle>Full Name*</InformTitle><Input /></Row>
            <Row><InformTitle>Phone Number*</InformTitle><Input /></Row>
            <Row><InformTitle>House number*</InformTitle><Input /></Row>
            <Row><InformTitle>Country*</InformTitle><Input /></Row>
            <Row><InformTitle>City*</InformTitle><Input /></Row>
            <Row><InformTitle>State/Province*</InformTitle><Input /></Row>
            <Row><InformTitle>Street*</InformTitle><Input /></Row>
            <Row><InformTitle>Zip/Postal Code*</InformTitle><Input /></Row>
       
            
               <Button>Add New Address</Button>
           </Box>
        
          
   
         
           </Wrapper>
    
        </Container>
    )
}

export default UserAddresses

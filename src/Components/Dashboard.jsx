import React, { useState } from 'react'
import styled from 'styled-components'
import { SM } from '../responsive'

import { auth } from '../firebase-config';
import {onAuthStateChanged} from "firebase/auth";
import { VisibilityOffOutlined } from '@material-ui/icons';

const Container=styled.div`
padding: 1rem;

`
const Wrapper=styled.div`
display:flex;
flex-wrap:wrap;

`

const Title=styled.h2`
    margin-bottom:1rem;
`
const Box=styled.div`
padding:15px;
-webkit-box-shadow: 2px 0px 7px 0px #D2D2D2; 
box-shadow: 2px 0px 7px 0px #D2D2D2;
margin:1rem;
width:40%;
${SM({width:"100%"})}
`
const BoxTitle=styled.h3`
margin:10px 0;
`
const Inform=styled.div`
display:flex;
align-items:center;
margin-bottom:5px;
padding-left:10px;
`
const InformTitle=styled.span`
margin-right:10px;
font-weight:700;

`
const Button=styled.button`
padding:10px;
margin:10px;
border:none;
color:#fff;
background-color:#003c8b;
border-radius:4px;
font-weight: 500;
font-size: 1rem;
cursor:pointer;
:hover{
    background-color:#7a9fce;
}
`


const Dashboard = () => {

    const [user, setUser] = useState({});
    const reviewNum=(JSON.parse(localStorage.getItem("beauty-shop-userReview")))?.length;
    const wishlistNum=(JSON.parse(localStorage.getItem("beauty-shop-wishlist")))?.length;

  onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser);
  })

  
    return (
        <Container>
            <Title>Dashboard</Title>
            <Wrapper>
           <Box>
              <BoxTitle> Information</BoxTitle>
               <Inform><InformTitle>Email</InformTitle> {user?.email}</Inform>
               <Inform><InformTitle>Password</InformTitle>*** </Inform>
               <Button>Edit Information</Button>
           </Box>
           <Box>
              <BoxTitle> Activity</BoxTitle>
               <Inform><InformTitle>Orders</InformTitle> 0</Inform>
               <Inform><InformTitle>Comments</InformTitle>{reviewNum}</Inform>
               <Inform><InformTitle>Favorites</InformTitle>{wishlistNum}</Inform>
            
           </Box>
           <Box>
              <BoxTitle> Newsletter</BoxTitle>
               <Inform>You aren't subscribed to our newsletter ! </Inform>
               
            
           </Box>
           </Wrapper>
        </Container>
    )
}

export default Dashboard

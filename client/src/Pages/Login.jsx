
import styled from "styled-components";
import {MD, SM, XS} from "../responsive";

import { Link, Redirect, useHistory } from "react-router-dom";
import { login } from "../Query";
import { useCustomer, useClient } from "../Store";
import Footer from "../Components/Footer"
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import { useState } from "react";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:url("../Images/sign-in2-1.jpg")center;
  background-color:#C6B1FF;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
     width: 370px;
    padding: 20px;
    background-color: #fff;
    box-shadow: -6px 6px 20px 1px #939393ed;
    border-radius: 5px;

  ${XS({ width: "300px"})} 
`;

const Title = styled.h2`
  
  padding: 0 5px 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  border: 1px solid #b2b2b2;
  border-radius: 3px;
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  position:relative;

`;
const BoxTitle = styled.h3`
font-size: .8rem;
color: #9d9d9d;
padding: 5px 5px 0;
`;
const Icon = styled.span`
position:absolute;
bottom: 4px;
right: 10px;
cursor: pointer;
svg{
  color: #b2b2b2;
}
`;
const Input = styled.input`
background: transparent;
border: none;
width: 94%;
padding: 5px 10px 8px;
font-size:1rem;
&:focus{
  outline:none;
}
`;

const Button = styled.button`
width: 100%;
border: none;
padding: 15px 20px;
background-color: #5d54c4;
color: white;
cursor: pointer;
margin: 30px 0 15px;
height: 45px;
border-radius: 5px;
font-size:1rem;
box-shadow: 0 10px 18px -6px #5d54c4b5;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const LinkTag = styled.span`
  font-weight:500;
  margin: 5px 0px;
  font-size: 12px;
  a{
    text-decoration: underline;
    color:#1D9CF9;
    padding-left:5px;
  }
`;


const Login = () => {
 
  document.body.style.overflowY = "scroll";
  const [showPassword, setShowPassword] = useState(false)


  const client = useClient();
  const history = useHistory();
  const { customer, setCustomer } = useCustomer();

  const handleSubmit = (event) => {
    event.preventDefault();

    const [email, password] = event.target.elements;

    client
      .request(login, {
        email: email.value,
        password: password.value,
      })
      .then(({ login_customer: { customer, token } }) => {
        client.setHeader("authorization", `Bearer ${token}`);

        setCustomer(customer);

        history.push("/panel/dashboard");
      })
      .catch(console.log);
      console.log('hiiiii')
     
  };

  if (customer) {
    return <Redirect to="/panel/dashboard" />;
  }


 
  return (
    <>
    <Container>
      <Wrapper>
        <Title>Sign in to your account</Title>
        <Form onSubmit={handleSubmit}> 
        <Box>
        <BoxTitle>Email</BoxTitle>
          <Input
            type="email"
            placeholder="email"/>

            </Box>

            <Box>
              <BoxTitle>Password</BoxTitle>
                <Icon onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined /> }
                  
                  </Icon>
          <Input
            placeholder="123456"
            type={showPassword ? "text" : "password"}
          />
          </Box>
          <Button  type="submit">
            Sign In
          </Button >
         
        
          <LinkTag>DON'T HAVE AN ACCOUNT YET ?<Link to="/auth/sign-up">CREATE A NEW ACCOUNT</Link></LinkTag>
        </Form>
      </Wrapper>
    </Container>

     <Footer/>
     
    </>
  );
};

export default Login;
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import styled from 'styled-components';
import { SearchOutlined,MenuOutlined,Clear ,ShoppingCartOutlined, AccountCircleOutlined, ArrowUpward, ArrowDropUp, ArrowDropDown} from '@material-ui/icons';
import { MD, SM,XS } from '../responsive';
import { Items } from './Menu/MenuData';
import Menu from './Menu/Menu';

import {  useHistory } from "react-router-dom";
import { remove_refresh_token } from "../Query";
import { useCustomer, useClient } from "../Store";
import Sidebar from './Sidebar/Sidebar';






const Container = styled.div` `

const Wrapper = styled.div`
height: 60px;
padding: 0 15px;
display: flex;
align-items: center;
justify-content: space-evenly;
border-bottom: 1px solid #eee;
position:relative;

`

const Right = styled.div`
display: flex;
flex: 1;
justify-content: end;
align-items: center;

`
const IconContainer = styled.div`
display: flex;
padding-right: 25px;
margin-left:10px;

${SM({paddingRight:"10px"})}
`
const SearchIcon = styled.div`
padding-right: 10px;
display:none;
${SM({display:"block"})}
`
const Btn = styled.div`
cursor: pointer;
padding: 10px 15px;
margin-left: 2rem;
${SM({display:"none"})}
`
const MenuIcon = styled.div`
display: none;
cursor: pointer;

${SM({display:"block"})}


`

const MenuItems = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
${SM({display:"none"})}

`
const MenuItem = styled.div`
font-weight: 700;
display: flex;
align-items: center;
justify-content:center;


:hover{
    ::after{
    content:${(props)=>props.hover==="true" && ' "" '};    
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 15px 12px 15px;
    border-color: transparent transparent #f0f0f0 transparent;
    line-height: 0;
    _border-color: transparent transparent #f0f0f0 transparent;
    _filter: progid:DXImageTransform.Microsoft.Chroma(color='#f0f0f0');
    position:absolute;
    bottom:0;
    }
}


`
const LinkMenuItem=styled(Link)`
  padding: 22px 10px;
  font-size:.9rem;
`
const Left = styled.div`
display: flex;
flex: 1;
height:100%;
align-items: center;
${SM({flex:"2",justifyContent:"space-between"})}
`

const LogoContainer = styled.div`
overflow:hidden;
margin-right: 12px;
width: 130px;
${SM({position:"absolute",left:"0",right:"0",margin:"auto"})}

`
const Logo = styled.img` `

const Search = styled.div`
width: 45%;
height: 30px;
display: flex;
align-items: center;
justify-content: space-between;
border-right: 1px solid #ebebeb;
border-bottom: 1px solid #ebebeb;
padding: 0 15px;
margin-right: 35px;
${SM({display:"none"})}
${MD({marginRight:"0"})}
`
const Input = styled.input`
border:none;
width: 80%;
background-color:transparent;
&:focus{
    outline: none;
}
 `
const Modal = styled.div`
display: none;
flex-direction:column;
width: 100%;
height: 100vh;
background-color: #eee;
position: fixed;
top: 0;
z-index: 100;
align-items: end;
svg{padding:10px;cursor:pointer}
${SM({display:"flex"})}
 `
const ModalSearch = styled.div`
display: flex;
width: 100%;
border-top:1px solid #7c7c7c;
border-bottom:1px solid #7c7c7c;
 `
const Account = styled.div`
position: relative;
display:flex;
align-items:center;
cursor:pointer;
padding-left:10px;
${SM({display:"none"})}
 `
const AccountBtn = styled.div`
display:flex
align-items:center;
cursor:pointer;
 `
const DropdownAccount = styled.ul`
position: absolute;
left: -23px;
background-color: #fdfdfd;
padding: 0;
z-index: 1;
top: 28px;
border: none;
width: 135px;
border-radius: 3px;
box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
 `
const DropdownAccountItem = styled.li`
padding: 8px 10px;
font-size: .9rem;
cursor: pointer;
border-bottom: 1px solid #f6f6f6;
:hover{
    background-color: #e7e7e7;
}
 `




const Navbar = () => {

    const client = useClient();
    const history = useHistory();
    const { customer, setCustomer } = useCustomer();
 

    const [itemIndex, setItemIndex] = useState('');
    const [modal, setModal] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [hover, setHover] = useState(false)
    const [click, setClick] = useState(false)

    const cartNum=(JSON.parse(localStorage.getItem("beauty-shop-proIds"))).length;
   
 
    const handleMouseLeave=()=>{
       
     setHover(false);
     setItemIndex('');
        
    }
    
    

    const handleSidebar = () => {
        setSidebar(true);
        // document.body.style.overflow = "hidden"
      };

    const logout = () => {
        client.request(remove_refresh_token).finally(() => {
          history.push("/");
    
          setCustomer(null);
        });
      };

      useEffect(() => {

        const test=itemIndex !=='' && setTimeout(() => {setHover(true)}, 300);

          return () => {
              clearTimeout(test)
          }
      }, [itemIndex])
 
   
    return (
        <>
        <Container>
            <Wrapper>
            <Left>
               
            <MenuIcon onClick={handleSidebar}> <MenuOutlined /> </MenuIcon>

            <LogoContainer><Link to="/"><Logo src="../Images/logo-1.png" /></Link></LogoContainer>

                    <MenuItems>

                    {Items.map((item,index)=>(
                        
                        <MenuItem key={index}
                        hover={hover===true && "true"}
                        onMouseEnter={()=>setItemIndex(index)}
                        onMouseLeave={()=>handleMouseLeave()}
                        > 
                     <LinkMenuItem>{item.title}</LinkMenuItem> 
                    
                       
                        {index === itemIndex && hover===true &&
                         <Menu menuData={item.Lev2} image={item.img}/>
                        }
                        </MenuItem>
                    )
                    )}
              
                 
                    </MenuItems>
               

              
                    
            </Left>
                <Right>
                <Search>
                    <Input placeholder='What are you looking for ?' />
                    <SearchOutlined style={{cursor:"pointer"}} />

                    </Search>

                    {!customer ?  
                     <Btn> <Link to="/auth/sign-in">SIGN IN</Link> </Btn>
                    : <Account>
                    <AccountBtn onClick={()=>setClick(!click)}>
                    <AccountCircleOutlined /> 
                    {click ? <ArrowDropUp /> :<ArrowDropDown />}
                    </AccountBtn>
                    {click &&
                    <DropdownAccount>
                    <DropdownAccountItem><Link to="/panel/dashboard">My Account</Link></DropdownAccountItem>
                    <DropdownAccountItem><Link to="/panel/wishlist">My Wishlist</Link></DropdownAccountItem>
                    <DropdownAccountItem onClick={()=>logout()}>Sign Out</DropdownAccountItem>
                    </DropdownAccount>
                    }
                    </Account>
                   
                    }
                   
           
                    <IconContainer>
                    <SearchIcon><SearchOutlined style={{cursor:"pointer"}} onClick={()=>setModal(true)}/></SearchIcon>
                   <Link to="/cart"><Badge badgeContent={cartNum} color="primary">
                   <ShoppingCartOutlined />
                   </Badge>
                   </Link>
                    
                </IconContainer>
      

                     </Right>

            </Wrapper>

             
        </Container>
        {modal &&
        
        <Modal>
        <Clear onClick={()=>setModal(false)}/>
        
        <ModalSearch>
            <SearchOutlined />
            <Input placeholder='What are you looking for ?'/>
             
           
        </ModalSearch>
        </Modal>
        }
        {sidebar &&
        <Sidebar sidebar={Sidebar} setSidebar={setSidebar}/>
        }

        </>
    )
}

export default Navbar

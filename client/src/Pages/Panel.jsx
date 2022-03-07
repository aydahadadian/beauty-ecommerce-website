import styled from "styled-components";
import {
  CommentOutlined,
  DirectionsOutlined,
  ExitToAppOutlined,
  FavoriteBorder,
  HomeOutlined,
  LocationOnOutlined,
  ShoppingBasketOutlined,
} from "@material-ui/icons";

import Navbar from "../Components/Navbar"

import { Link, Redirect, useHistory,useParams } from "react-router-dom";
import { remove_refresh_token } from "../Query";
import { useCustomer, useClient } from "../Store";
import Dashboard from "../Components/Dashboard";
import Wishlist from "../Components/Wishlist";
import Orders from "../Components/Orders";
import UserReviews from "../Components/UserReviews";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import Announcement from "../Components/Announcement";
import { SM } from "../responsive";
import UserAddresses from "../Components/UserAddresses";


const Container=styled.div`
display:flex;
padding:2rem;
${SM({flexDirection:"column-reverse"})}
`
const Leftbar=styled.div`
flex:1;
max-width: 220px;
background-color: #eee;
border-radius:4px;
height:420px;
${SM({maxWidth:"100%"})}

`
const LeftbarWrapper=styled.div``
const MenuLink=styled.div`
 padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  position:relative;
  margin-bottom: 4px;
  background-color: ${(props)=>props.active === true && "#5d54c44d"};

  :hover{ background-color:${(props)=>props.active !== true && "#5d54c41c"} }

  a{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index:2;
  }
  ::before{
    content: '';
    background-color:#5d54c4;
    width:7px;
    height:100%;
    position:${(props)=>props.active === true && "absolute" };
    left:0;
    top:0;
  }
 
`



const MenuLinkTitle =styled.span`
  margin-left: 10px;
  margin-right: 5px;
 `

const Right=styled.div`
flex:3;
`


const Panel = () => {
  const  {link}  = useParams();



  console.log(link)

    const client = useClient();
    const history = useHistory();
    const { customer, setCustomer } = useCustomer();

    const data=[
       {id:1,
        icon:<HomeOutlined />,
        name:"dashboard",
        component:<Dashboard userData={customer}/>
      },
      {id:2,
        icon: <FavoriteBorder />,
        name:"wishlist",
        component:<Wishlist />
      },
      {id:3,
        icon:<CommentOutlined />,
        name:"reviews",
        component:<UserReviews />
      },
       {id:4,
        icon:<DirectionsOutlined />,
        name:"addresses",
        component:<UserAddresses />,
      },
       {id:5,
        icon:<ShoppingBasketOutlined />,
        name:"orders",
        component:<Orders />
      }

    ]

    const currentData=data.find(d=>d.name=== link);
  
    const logout = () => {
      client.request(remove_refresh_token).finally(() => {
        history.push("/auth/sign-in");
  
        setCustomer(null);
      });
    };
  
    if (!customer) {
      return <Redirect to="/auth/sign-in" />;
    }
  
    return (
      <>   

      <Navbar />
      <Announcement />
          
      <Container>
     
    <Leftbar>

      <LeftbarWrapper>

     
      {data.map((item,index)=>
      
      <MenuLink active={item.name===link && true}>
      <Link to={`/panel/${item.name}`} />
       {item.icon}
      <MenuLinkTitle>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</MenuLinkTitle>
      </MenuLink>
      
      )}
     

      <MenuLink   onClick={() => logout()}>
      <ExitToAppOutlined />
      <MenuLinkTitle>Logout</MenuLinkTitle>
      </MenuLink>

      </LeftbarWrapper>
    </Leftbar>


        <Right>
          {currentData.component}
 
          </Right>  
            
     
     
          </Container>

          <Newsletter />
          <Footer />
          </>
    );
  };
  
  export default Panel;
  
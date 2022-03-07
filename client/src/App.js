
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import ProductList from './Pages/ProductList';

import { ClientWrapper, CustomerWrapper } from "./Store";
import Cart from './Pages/Cart';
import Panel from './Pages/Panel';

function App() {
  return (
    <>
    <Router>
      <Switch>
  

    <Route  path="/products">
    <ProductList/>
    </Route>

    <Route  path="/product/:idProduct">
    <Product/>
    </Route>

    <Route  path="/cart">
    <Cart/>
    </Route>

    <ClientWrapper>
      <CustomerWrapper>
      <Route  exact path="/">
    <Home/>
    </Route>
    
    <Route  path="/auth/sign-in">
    <Login/>
    </Route>

    <Route  path="/auth/sign-up">
    <Register />
    </Route>

    <Route path="/panel/:link">
<Panel />
      </Route>

    </CustomerWrapper>
    </ClientWrapper>
    

    </Switch>
    </Router>
    </>
  );
}

export default App;

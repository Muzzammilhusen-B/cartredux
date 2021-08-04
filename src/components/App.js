import React from "react";
import Login from "./Login";
import Registration from "./Regitration";
import Forgotpwd from "./Forgotpwd";
import LoginHome from "./LoginHome";
import Registered from "./Registered";
// import Cart from "./Cart";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CartDetails from "./CartDetails";
// import history from "../history";

const App = () => {
  return (
    <div>
      <BrowserRouter
      // history={history}
      >
        <Switch>
          <Route path="/" exact component={Login} />

          <Route path="/registration" exact component={Registration} />
          <Route path="/forgotpwd" exact component={Forgotpwd} />
          <Route path="/loginhome" exact component={LoginHome} />
          <Route path="/registered" exact component={Registered} />
          <Route path="/loginhome/cart/:id" exact component={CartDetails} />
          {/* <Route path="/loginhome/cart" exact component={Cart} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

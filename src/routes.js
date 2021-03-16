import React from "react";
import App from "./App";
import { Switch, Route } from "react-router-dom";


export default (
  <Switch>
    <Route exact path="/" component={App} />
    {/* <Route exact path='/Cart' render={() => (
      window && requireAuth() ? (
        <Redirect to="/"/>
      ) : (
        <Cart />
      ))}
    /> */}
    
  </Switch>
);

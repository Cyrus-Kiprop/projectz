import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import Dashboard from "views/examples/Dashboard.jsx";
import Logs from "views/examples/LogsPage.jsx";
import Login from "views/examples/LoginPage.jsx";
import Profile from "views/examples/ProfilePage.jsx";
import NewSacco from "views/examples/NewSacco.jsx";
import ResetPassword from "views/examples/ResetPassword.jsx";
import SaccoProfile from "views/examples/SaccoProfile.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin/home" component={Dashboard} />
      <Route path="/admin/login" component={Login} />
      <Route path="/admin/logs" component={Logs} />
      <Route path="/admin/new-sacco" component={NewSacco} />
      <Route path="/admin/admin-profile" component={Profile} />
      <Route path="/admin/sacco/profile/:id" component={SaccoProfile} />
      <Route path="/reset_password" component={ResetPassword} />
      <Redirect from="/" to="/admin/home" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

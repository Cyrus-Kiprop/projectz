
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

// core components
import Login from 'components/Login.jsx'
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import AuthFooter from "components/Footers/AuthFooter.jsx";



class LoginPage extends React.Component {
 
  render() {
    return (
      <>
        <div className="main-content">
          <AuthNavbar />
          <div className="header bg-gradient-success py-7 py-lg-8">
            <Container>
              <div className="header-body text-center mb-7">

              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              <svg
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Login/>
            </Row>
          </Container>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default LoginPage;

import React, { Component } from "react";
import {
  Button,
  Card,
  CardHeader,
  NavbarBrand,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Container,
  Col
} from "reactstrap";
import AuthNavbar from "components/Navbars/AuthNavbar.jsx";
import AuthFooter from "components/Footers/AuthFooter.jsx";
// import Auth from 'layouts/Auth.jsx';

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    document.body.classList.add("bg-default");
  }
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
          <div>
        <Form role="form">
          <FormGroup className="mb-3">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-email-83" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Email" type="email" />
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
          </Row>
        </Container>
      </div>
      <AuthFooter />
    </>
      
     
    );
  }
}
export default ResetPassword;
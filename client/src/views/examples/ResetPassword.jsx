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
  Col
} from "reactstrap";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
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
    );
  }
}
export default ResetPassword;
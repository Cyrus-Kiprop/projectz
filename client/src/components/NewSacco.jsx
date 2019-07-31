import React from "react";
// import AdminLayout from '../layouts/Admin.jsx'

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });
  return valid;
};
class NewSacco extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: "",
      website: "",
      date_founded: "",
      name: "",
      address: "",
      registration_number: "",
      telephone_number: "",
      email: "",
      postal_code: 0,
      password: "",
      confirmPassword: "",
      // sendPassword: '',
      // newUser: null,
      formErrors: {
        saccoName: "",
        registrationNumber: "",
        postal_code: "",
        email: "",
        year: "",
        phone: "",
        address: "",
        website: "",
        password: "",
        confirmpassword: ""
      }
    };
  }

  // validation
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "name":
        formErrors.saccoName = value.length < 3 ? "Required" : "";
        break;
      case "registration_number":
        formErrors.registrationNumber =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "date_founded":
        formErrors.year =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "telephone_number":
        formErrors.phone = /^[0-9]{10}$/.test(value)
          ? ""
          : "Invalid phone number";
        break;
      case "address":
        formErrors.address = value.length > 5 ? "Invalid address" : "";
        break;
      case "website":
        formErrors.website =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characaters required" : "";
        break;
      case "postal_code":
        formErrors.postal_code = value.length > 8 ? "Invalid code" : "";
        break;
      case "confirmPassword":
        formErrors.confirmpassword =
          value.length < 6 ? "minimum 6 characaters required" : "";
        formErrors.confirmpassword =
          value != this.state.password ? "Password don't match!!" : "";
        break;
      default:
    }

    this.setState({ formErrors, [name]: value });
  };

  //handler functions
  // handleChange = event => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  //   console.log(this.state);
  // };
  handleSubmit = () => {
    const data = this.state;
    // invoke the saveData with the new data
    if (formValid(this.state)) {
      this.saveData({
        description: data.description,
        website: data.website,
        date_founded: data.date_founded,
        name: data.name,
        registration_number: data.registration_number,
        telephone_number: data.telephone_number,
        email: data.email,
        address: `P.O.BOX ${data.address}`,
        postal_code: data.postal_code,
        password: data.confirmPassword
      });
    } else {
      console.log("Invalid");
    }
  };
  // saves the data to the db
  saveData = data => {
    fetch(`/api/saccos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const { history } = this.props;
        //history.push(`/admin/index`);
      })
      .catch(err => {
        console.log(err);
        alert("unable create the sacco");
      });
  };

  render() {
    const {
      description,
      website,
      date_founded,
      name,
      address,
      registration_number,
      password,
      confirmPassword,
      telephone_number,
      email,
      postal_code
    } = this.state;

    const { formErrors } = this.state;

    return (
      <div style={{ marginTop: "160px" }}>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Sacco Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="name"
                              onChange={this.handleChange}
                              value={name}
                              placeholder="Sacco Name"
                              type="text"
                            />
                            {formErrors.saccoName.length > 0 && (
                              <span style={{ color: "red", fontSize: 15 }}>
                                {formErrors.saccoName}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="email"
                              onChange={this.handleChange}
                              value={email}
                              placeholder="Enter email"
                              type="email"
                            />
                            {formErrors.email.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold"
                                }}
                              >
                                {formErrors.email}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Registration Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="registration_number"
                              onChange={this.handleChange}
                              value={registration_number.toUpperCase()}
                              placeholder="Registration Number"
                              type="text"
                            />
                            {formErrors.registrationNumber.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.saccoName}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Year Founded
                            </label>
                            <Input
                              name="date_founded"
                              onChange={this.handleChange}
                              value={date_founded}
                              className="form-control-alternative"
                              placeholder="Year founded"
                              type="text"
                            />
                            {formErrors.year.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontStyle: " italic"
                                }}
                              >
                                {formErrors.year}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="address"
                              onChange={this.handleChange}
                              value={address}
                              placeholder="Enter Address"
                              type="number"
                            />
                            {formErrors.address.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeigth: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.address}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="telephone_number"
                              onChange={this.handleChange}
                              value={telephone_number}
                              placeholder="Enter Phone Number"
                              type="number"
                            />
                            {formErrors.phone.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontStyle: "italic",
                                  fontWeight: "bold"
                                }}
                              >
                                {formErrors.phone}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal Code
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="postal_code"
                              onChange={this.handleChange}
                              value={postal_code}
                              placeholder="Postal code"
                              type="number"
                            />
                            {formErrors.postal_code.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.postal_code}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Website link
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="website"
                              onChange={this.handleChange}
                              value={website}
                              placeholder="website"
                              type="text"
                            />
                            {formErrors.website.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.website}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Create Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="password"
                              onChange={this.handleChange}
                              value={password}
                              type="password"
                            />
                            {formErrors.password.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.password}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Confirm Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              name="confirmPassword"
                              onChange={this.handleChange}
                              value={confirmPassword}
                              type="password"
                            />
                            {formErrors.confirmpassword.length > 0 && (
                              <span
                                style={{
                                  color: "red",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  fontStyle: "italic"
                                }}
                              >
                                {formErrors.confirmpassword}
                              </span>
                            )}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          name="description"
                          onChange={this.handleChange}
                          value={description}
                          className="form-control-alternative"
                          placeholder="A few words about you..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <Button
                        color="info"
                        type="button"
                        onClick={this.handleSubmit}
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewSacco;

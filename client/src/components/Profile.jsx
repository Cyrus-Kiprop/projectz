import React from "react";
import { Link } from "react-router-dom";
// reactstrap components

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
//Our higher order component
import withAuth from "withAuth.js";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sacco: {},
      diabled: true,
      red: true,
      name: "active"
    };
  }
  // lifecycle control
  componentDidMount() {
    // this.setState({ id: this.props.id });
    const sacco = this.props.sacco;
    this.setState({
      sacco
    });
  }

  // handle change
  handleChange = event => {
    const target = event.target;
    const { name, value } = target;

    event.preventDefault();
    this.setState({
      sacco: {
        [name]: value
      }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.saveData(this.state.sacco);
  };

  // onDeactivate:
  onDeactivate() {
    this.setState({ red: !this.state.red });
    this.setState({ name: !this.state.name });
  }

  // load Data for a specific sacc
  render() {
    let btn_class = this.state.red ? "info" : "danger";
    let btn_name = this.state.name ? "Active" : "Deactivated";
    //const { name,id} = this.props;
    console.log(this.props.sacco);
    const {
      name,
      email,
      registration_number,
      date_founded,
      description,
      address,
      location,
      telephone_number,
      postal_code,
      website,
      password
    } = this.props.sacco;
    //console.log(id);
    return (
      <>
        <UserHeader name={name} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3" />
                </Row>

                <CardBody
                  style={{ background: "#e4f0f7" }}
                  className="pt-0 pt-md-4"
                >
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">78</span>
                          <span className="description">Registered Riders</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>{this.state.sacco.name}</h3>
                    <h3 style={{ background: "#cee0eb", borderRadius: "10px" }}>
                      {btn_name}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {address}, {location}
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Registration Number: {registration_number}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Email: {email}
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      Year Founded: {date_founded}
                    </div>
                    <hr className="my-4" />
                    <p>{description}</p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Link to="/admin/logs">
                    <Button color="success">Logs</Button>
                  </Link>
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Details</h3>
                    </Col>

                    <Col className="text-right" xs="4">
                      <Button
                        color={btn_class}
                        href="#pablo"
                        onClick={this.onDeactivate.bind(this)}
                        size="lg"
                      >
                        {btn_name}
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
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
                              value={name}
                              onChange={this.handleChange}
                              name="name"
                              placeholder="Sacco Name"
                              type="text"
                            />
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
                              value={email}
                              name="email"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="Enter email"
                              type="email"
                            />
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
                              value={registration_number}
                              name="registration_number"
                              onChange={this.handleChange}
                              placeholder="Registration Number"
                              type="text"
                            />
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
                              className="form-control-alternative"
                              value={date_founded}
                              name="date_founded"
                              onChange={this.handleChange}
                              placeholder="Year founded"
                              type="text"
                            />
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
                              value={address}
                              name="address"
                              onChange={this.handleChange}
                              className="form-control-alternative"
                              placeholder="Enter Address"
                              type="text"
                            />
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
                              value={telephone_number}
                              name="telephone_number"
                              onChange={this.handleChange}
                              placeholder="Enter Phone Number"
                              type="text"
                            />
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
                              value={postal_code}
                              name="postal_code"
                              onChange={this.handleChange}
                              placeholder="Postal code"
                              type="number"
                            />
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
                              value={website}
                              name="website"
                              onChange={this.handleChange}
                              placeholder="website"
                              type="text"
                            />
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
                              New Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="password"
                              type="password"
                            />
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
                              value={password}
                              name="password"
                              onChange={this.handleChange}
                              type="password"
                            />
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
                          className="form-control-alternative"
                          value={description}
                          name="description"
                          onChange={this.handleChange}
                          placeholder="A few words about you..."
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                      <Button
                        color="info"
                        diabled="true "
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
      </>
    );
  }
}

export default Profile;

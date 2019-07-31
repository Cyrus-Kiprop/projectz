import React, { Component } from "react";
import Navbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Footer from "components/Footers/AdminFooter.jsx";
import Profile from "components/Profile.jsx";
import { Container } from "reactstrap";

//Our higher order component
import withAuth from "withAuth.js";
class SaccoProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sacco: {},
      id: ""
    };
    console.log(this.props);
  }
  // componentWillReceiveProps(newProps) {
  //   console.log(newProps);
  // }

  componentDidMount() {
    this.setState({
      id: this.props.match.params.id
    });
    this.loadData();
  }

  loadData() {
    console.log(this.state.id);
    fetch(`/api/saccos/${this.props.match.params.id}`)
      .then(response => {
        if (response.ok) {
          response.json().then(sacco => {
            console.log(sacco);
            this.setState({ sacco });
          });
        } else {
          response.text().then(error => {
            alert(`Failed to fetch  sacco: ${error.message}`);
          });
        }
      })
      .catch(err => {
        alert(`Error in fetching data from server: ${err.message}`);
      });
  }
  // saves the data to the database
  update = data => {
    fetch(`/api/saccos/${this.props.match.params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        data
      })
    })
      .then(response => {
        response.json().then(response => {
          console.log(response);
          this.setState({
            sacco: response
          });
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    console.log(this.state.sacco);

    return (
      <>
        <Sidebar
          logo={{
            innerLink: "/admin/home",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar />
          <Profile saveData={this.update} sacco={this.state.sacco} />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default SaccoProfile;

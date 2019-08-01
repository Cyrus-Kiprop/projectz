import React, { Component } from "react";
import Navbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Footer from "components/Footers/AdminFooter.jsx";
import Header from "components/Headers/Header.jsx";
import AdminHome from "components/AdminHome.jsx";
import { Container } from "reactstrap";
import { withRouter } from "react-router";

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from "AuthHelperMethods.js";
//Our higher order component
import withAuth from "withAuth.js";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadData();
    }
  }
  // handle any change in the search
  search = searchQuery => {
    // Variable to hold the original version of the list
    let currentList = [];
    // Variable to hold the filtered list before putting into state
    let newList = [];

    // If the search bar isn't empty
    if (searchQuery !== "") {
      // Assign the original list to currentList
      currentList = this.state.data;
      const filter = searchQuery;

      // Use .filter() to determine which items should be displayed
      // based on the search terms
      for (var i = 0; i < currentList.length; i++) {
        for (const key in currentList[i]) {
          if (
            currentList[i][key]
              .toString()
              .toLowercase()
              .indexOf(filter) !== -1
          ) {
            newList.push(currentList[i]);
          }
        }
      }
      // Set the filtered state based on what our rules added to newList
      this.setState({
        data: newList
      });
    }
  };

  // loading the state with data
  loadData() {
    // axios is so messsy
    fetch(`/api/saccos`)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
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
          <Header data={this.state.data} />
          <AdminHome search={this.search} />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default withAuth(Dashboard);

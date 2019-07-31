import React, { Component } from "react";
import Navbar from "components/Navbars/AdminNavbar.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Footer from "components/Footers/AdminFooter.jsx";
import AdminProfile from "components/AdminProfile.jsx";
import { Container } from "reactstrap";

export default class Dashboard extends Component {
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

          <AdminProfile />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}

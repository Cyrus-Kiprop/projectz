import React, { Component } from 'react';
import Navbar from 'components/Navbars/AdminNavbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Footer from 'components/Footers/AdminFooter.jsx';
import SaccoProfile from 'components/Profile.jsx';
import { Container } from 'reactstrap';

import AuthHelperMethods from 'AuthHelperMethods.js';
//Our higher order component
import withAuth from 'withAuth.js';
class Dashboard extends Component {
  constructor(props){
    super(props);
    console.log(this.props)
  }

  render() {
    console.log(this.props);
    return (
      <>
        <Sidebar
          logo={{
            innerLink: '/admin/home',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar />
          <SaccoProfile />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default withAuth(Dashboard);

import React, { Component } from 'react';
import Navbar from 'components/Navbars/AdminNavbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Footer from 'components/Footers/AdminFooter.jsx';
import Header from 'components/Headers/Header.jsx';
import AddSacco from 'components/NewSacco.jsx';
import { Container } from 'reactstrap';

import AuthHelperMethods from 'AuthHelperMethods.js';
//Our higher order component
import withAuth from 'withAuth.js';

class Dashboard extends Component {
  render() {
    return (
      <>
        <Sidebar
          logo={{
            innerLink: '/admin/home',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div
          style={{ marginLeft: '30%' }}
          className="main-content"
          ref="mainContent"
        >
          <AddSacco />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}

export default withAuth(Dashboard);

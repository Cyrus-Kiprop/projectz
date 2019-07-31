import React, { Component } from 'react';
import Navbar from 'components/Navbars/AdminNavbar.jsx';
import Sidebar from 'components/Sidebar/Sidebar.jsx';
import Footer from 'components/Footers/AdminFooter.jsx';
import Header from 'components/Headers/Header.jsx';
import Home from 'components/AdminHome.jsx';
import { Container } from 'reactstrap';
import { withRouter } from "react-router";

/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from 'AuthHelperMethods.js';
//Our higher order component
import withAuth from 'withAuth.js';

class Dashboard extends Component {

constructor(){
  super();
  this.state={
    data:[]
  }
}

componentDidMount() {
  this.loadData();
}

componentDidUpdate(prevProps) {
  if (this.props.location !== prevProps.location) {
    this.loadData();
  }
}
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
            innerLink: '/admin/home',
            imgSrc: require('assets/img/brand/argon-react.png'),
            imgAlt: '...',
          }}
        />
        <div className="main-content" ref="mainContent">
          <Navbar />
          <Header data={this.state.data}/>
          <Home />
          <Container fluid>
            <Footer />
          </Container>
        </div>
      </>
    );
  }
}
export default withAuth(Dashboard);

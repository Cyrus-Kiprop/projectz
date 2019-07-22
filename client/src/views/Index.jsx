import queryString from 'query-string';
import React from 'react';
// node.js library that concatenates classes (strings)
// javascipt plugin for creating charts
// react plugin used to create charts
import AdminTable from '../components/AdminTable.jsx';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components

import Header from 'components/Headers/Header.jsx';

class Index extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = { data: [], sortBy: 'name' };

    this.loadData = this.loadData.bind(this);
    this.deleteSacco = this.deleteSacco.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }

  // create methods here..
  // lifecycles
  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadData();
    }
  }

  setFilter(query) {
    // very important to stringify the data
    const { history, location } = this.props;
    const dataQuery = queryString.stringify(query);
    console.log(dataQuery);
    history.push(`${location.pathname}?${dataQuery}`);
  }

  // sorting handler function
  handleSortChange(event) {
    this.setState({
      sortBy: event.target.value,
    });
  }

  // deleteSacco
  deleteSacco(id) {
    console.log(id);
    fetch(`/api/saccos/${id}`, { method: 'DELETE' })
      .then(response => {
        response.json();
        // alert(response.message);
        this.loadData();
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  // this function loads the load data from the database
  loadData() {
    // axios is so messsy
    fetch(`/api/saccos${this.props.location.search}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { data, sortBy } = this.state;
    const sortedData = data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1)); //this goes for sorting functions
    return (
      <>
        <Header />
        {/* Page content */}
        <AdminTable data={sortedData} deleteSacco={this.deleteSacco} />
        <Col xl="4" />
      </>
    );
  }
}

export default Index;

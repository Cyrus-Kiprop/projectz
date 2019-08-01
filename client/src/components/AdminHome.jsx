import React from "react";
import Picker from "./DatePicker.jsx";
import { MDBCol, MDBIcon } from "mdbreact";
import queryString from "query-string";
import { withRouter } from "react-router";

import AdminTable from "./AdminTable.jsx";

import {
  Button,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import { Link } from "react-router-dom";
import { copyFileSync } from "fs";

class TableWhite extends React.Component {
  constructor() {
    super();
    this.state = { data: [], sortBy: "name", searchQuery: "" };
  }
  // loading the data

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
      sortBy: event.target.value
    });
  }
  handleSearchChange = event => {
    event.preventDefault();
    const target = event.target;
    const { value } = target;
    this.setState({
      searchQuery: event.target.value
    });
    this.props.search(this.state.searchQuery);
    console.log(this.state.searchQuery);
  };

  // this function loads the load data from the database
  loadData() {
    // axios is so messsy
    fetch(`/api/saccos`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state.searchQuery);
    const { data } = this.state;
    console.log(this.props);
    return (
      <div>
        <Link to="/admin/new-sacco">
          <Button style={{ margin: "40px", float: "right" }} color="success">
            New Sacco
          </Button>
        </Link>
        <br />
        <UncontrolledDropdown style={{ marginTop: "20px" }} group>
          <DropdownToggle caret color="info" data-toggle="dropdown">
            Sort
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>A-Z</DropdownItem>
            <DropdownItem>Z-A</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>

        <MDBCol style={{ float: "right" }} md="4">
          <form className="form-inline mt-4 mb-4">
            <MDBIcon icon="search" />
            <input
              className="form-control form-control-sm ml-3 w-75"
              type="text"
              value={this.state.searchQuery}
              onChange={() => this.handleSearchChange}
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </MDBCol>
        <div style={{ marginLeft: "130px", marginTop: "-43px" }}>
          <Picker />
        </div>
        <UncontrolledDropdown style={{ marginTop: "-120px" }} group>
          <DropdownToggle caret color="info" data-toggle="dropdown">
            Status
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Active</DropdownItem>
            <DropdownItem>Inactive</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <AdminTable data={data} />
        <CardFooter className="py-4">
          <nav aria-label="...">
            <Pagination
              className="pagination justify-content-end mb-0"
              listClassName="justify-content-end mb-0"
            >
              <PaginationItem className="disabled">
                <PaginationLink
                  href="#pablo"
                  onClick={e => e.preventDefault()}
                  tabIndex="-1"
                >
                  <i className="fas fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="active">
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  2 <span className="sr-only">(current)</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="fas fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </CardFooter>
      </div>
    );
  }
}
export default withRouter(TableWhite);

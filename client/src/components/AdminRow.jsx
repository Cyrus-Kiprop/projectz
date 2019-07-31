import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";

export default class AdminRow extends Component {
  constructor(props) {
    super(props);
    const { data } = props;
    const sacco = data;
    // console.log(sacco.status);
    this.state = {
      status: sacco.status
    };
  }
  // onclik handler functions
  onEditSacco = ({
    event: {
      target: { name, value }
    }
  }) => {
    Redirect(`admin/sacco-profile/`);
  };

  render() {
    const { status } = this.state;
    const { data } = this.props;
    const sacco = data;
    console.log(sacco);
    return (
      <>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <a href="http://localhost:3001/admin/user-profile">
                  <span className="mb-0 text-sm">{sacco.name}</span>
                </a>
              </Media>
            </Media>
          </th>
          <td>{sacco.created.substr(0, 10)}</td>
          <td>
            {status === "Active" ? (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-success" />
                Active
              </Badge>
            ) : (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-warning" />
                Deactivated
              </Badge>
            )}
          </td>
          <td>
            <span className="mb-0 text-sm">{sacco.telephone_number}</span>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <span className="mb-0 text-sm">{sacco.address}</span>
            </div>
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={e => e.preventDefault()}>
                  <Link to={{ pathname: `sacco/profile/${sacco._id}` }}>
                    Edit
                  </Link>
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  Deactivate
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      </>
    );
  }
}
AdminRow.propTypes = {
  sacco: PropTypes.object
};

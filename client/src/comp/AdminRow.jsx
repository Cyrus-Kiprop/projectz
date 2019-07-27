import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
} from 'reactstrap';
import { Link } from 'react-router-dom';
export default class AdminRow extends Component {
  constructor(props) {
    super(props);
    const { sacco } = props;
    console.log(sacco.status);
    this.state = {
      status: sacco.status,
    };
  }

  render() {
    const { status } = this.state;
    const { sacco } = this.props;
    console.log(sacco);
    return (
      <>
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <Media>
                <Link to="/admin/sacco-profile">
                  <span className="mb-0 text-sm">{sacco.name}</span>
                </Link>
              </Media>
            </Media>
          </th>
          <td>{sacco.created.substr(0, 10)}</td>
          <td>
            {status === 'Active' ? (
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
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  Edit
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
  sacco: PropTypes.object,
};

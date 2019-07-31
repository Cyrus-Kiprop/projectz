import React, { Component } from "react";
import PropTypes from "prop-types";
import withAuth from "withAuth.js";

class params extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <p>
          `this is the id obtained from react router $
          {this.props.match.params.id}`
        </p>
      </div>
    );
  }
}
export default params;

import React, {Component} from 'react'
import {
    Table,
    Row,
  } from 'reactstrap';
  import AdminRow from 'components/AdminRow.jsx';
  import PropTypes from 'prop-types';
  
export default class AdminTable extends Component{
    render(){
      const { data, deleteSacco } = this.props;
      console.log(data);
      // const Row = data.map((value, index) => {
      //   return <AdminRow key={value._id} sacco={value} />;
      // });
        return(

            <Table className="align-items-center table-flush" responsive>
            <thead className="thead-light">
              <tr>
                <th scope="col">Sacco Name</th>
                <th scope="col">Registered Date</th>
                <th scope="col">Status</th>
                <th scope="col">Contacts</th>
                <th scope="col">Location</th>
                <th scope="col" />
              </tr>
            </thead>
  
            <tbody></tbody>
          </Table>
        )
    }
}


/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

class Header extends React.Component {

  render() {
    //some basic javascript code
    // the data props is an array of objects
    const {data}= this.props;
    
    const activeArr = [];
    const deactivatedArr=[];
// active saccos
  data.map(sacco=>{
  if(sacco.status==='Active'){
    activeArr.push(sacco);
  }
    });
let activeSaccos = activeArr.length;

// Deactivated saccos
data.map(sacco=>{
  if(sacco.status==='Deactivated'){
    deactivatedArr.push(sacco);
  }
})
let deactivatedSaccos=deactivatedArr.length;

// registered saccos
const registeredSaccos = data.length;

    return (
      <>
        <div className="header bg-gradient-success pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Registerd Saccos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {registeredSaccos}
                          </span>
                        </div>

                      </Row>
                      
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Registered Riders
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            5,444
                          </span>
                        </div>
                       
                      </Row>
                   
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Active Saccos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">{activeSaccos}</span>
                        </div>
                        
                      </Row>
                
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Deactivated Saccos
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {deactivatedSaccos}
                          </span>
                        </div>
                       
                      </Row>
                    
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;

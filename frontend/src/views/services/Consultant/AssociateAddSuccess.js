import React from 'react';
import { useHistory } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Form,
    FormGroup,
    Col,
    Input,
    Button,
  } from "reactstrap";

const AssociateAddSuccess = () => {

    const history = useHistory();

    const backToAssociateList = () => {
        history.push("/associateList");
    }

    return (
        <div>
          <Card className="uapp-card-bg">
            <CardHeader className="page-header">
              <h3 className="text-white">Associate Registration</h3>
              <div className="page-header-back-to-home">
                <span className="text-white" onClick={backToAssociateList}>
                  {" "}
                  <i className="fas fa-arrow-circle-left"></i> Back to Associates
                </span>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <div className='p-3'>
             <h2>Success</h2>
             <p>Please notify the new associate to complete his / her profile!</p>
            </div>
          </Card>
        </div>
    );
};

export default AssociateAddSuccess;
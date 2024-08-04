import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputLabel, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

import Select from "react-select";
import { Card, CardBody } from "reactstrap";

const RegisteredUsers = () => {
  const [selectedOrder, setSelectedOrder] = useState({
    label: "Select Country",
    value: "Country..",
  });
  const orderName = [
    { label: "Order 1", value: 1 },
    { label: "Order 2", value: 2 },
    { label: "Order 3", value: 3 },
    // Add more orders as needed
  ];
  const selectOrder = (label, value) => {
    setSelectedOrder({ label, value });
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <div className="border-bottom d-flex justify-content-between">
        <h4>Registerd users</h4>
        <Button
          className="mb-3"
          variant="outlined"
          style={{
            borderColor: "gray",
            borderRadius: "5px",
          }}
        >
          <span className="pr-2">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          New User
        </Button>
      </div>
      {/* all select */}
      <div className="border-bottom  mt-4">
        <div className="row mb-4">
          <div className="col-md-3 mb-2">
            <p>Phone number / Email</p>
            <Select
              className="mr-md-2 mr-sm-0"
              options={orderName}
              value={{
                label: selectedOrder.label,
                value: selectedOrder.value,
              }}
              onChange={(opt) => selectOrder(opt.label, opt.value)}
            />
          </div>
          <div className="col-md-3 ">
            <p>Country</p>
            <Select
              className="mr-md-2 mr-sm-0"
              options={orderName}
              value={{
                label: selectedOrder.label,
                value: selectedOrder.value,
              }}
              onChange={(opt) => selectOrder(opt.label, opt.value)}
            />
          </div>
          <div className="col-md-3 ">
            <p>Platform</p>
            <Select
              className="mr-md-2 mr-sm-0"
              options={orderName}
              value={{
                label: selectedOrder.label,
                value: selectedOrder.value,
              }}
              onChange={(opt) => selectOrder(opt.label, opt.value)}
            />
          </div>
          <div className="col-md-3 ">
            <p>Registration Date</p>
            <Select
              className="mr-md-2 mr-sm-0"
              options={orderName}
              value={{
                label: selectedOrder.label,
                value: selectedOrder.value,
              }}
              onChange={(opt) => selectOrder(opt.label, opt.value)}
            />
          </div>
        </div>
      </div>
      {/* total user and filter reset and search */}
      <div className="row mt-4">
        <div className="col-md-9">
          <h4>387463874</h4>
          <p>Total User</p>
        </div>
        <div className="col-md-3">
          <div className="d-flex justify-content-around">
            <Select
              className="mr-md-2 mr-sm-0 "
              options={orderName}
              value={{
                label: selectedOrder.label,
                value: selectedOrder.value,
              }}
              onChange={(opt) => selectOrder(opt.label, opt.value)}
            />
            <Button
              className="md-mr-3"
              variant="outlined"
              style={{
                borderColor: "gray",
                borderRadius: "5px",
              }}
            >
              Reset
            </Button>
            <Button
              className=""
              variant="outlined"
              style={{
                borderColor: "skyblue",
                borderRadius: "5px",
                backgroundColor: "skyblue",
              }}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
      {/* table */}
      <table class="table mt-5">
        <thead class="thead-light">
          <tr>
            <th scope="col"></th>
            <th scope="col">PHONE NUMBER / EMAIL</th>
            <th scope="col">FLL NAME</th>
            <th scope="col">REGISTERD</th>
            <th scope="col">USER GROUP</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>123456</td>
            <td>ABC</td>
            <td>06 Mar </td>
            <td>Group 1</td>
            <td>
              <Button type="text" style={{ fontSize: "25px" }}>
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RegisteredUsers;

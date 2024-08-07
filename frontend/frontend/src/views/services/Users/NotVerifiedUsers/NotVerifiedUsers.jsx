import { faEllipsis, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, InputLabel, MenuItem } from "@material-ui/core";
import React, { useState } from "react";

import Select from "react-select";
import { Card, CardBody } from "reactstrap";

const NotVerifiedUsers = () => {
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
      <div className="border-bottom">
        <h4>Not Verified users</h4>
      </div>
      {/* all select */}
      <div className="border-bottom  mt-4">
        <div className="row mb-4">
          <div className="col-md-3 mb-2">
            <p>Registation Date</p>
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
            <p>Phone Number</p>
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
            <p>Email</p>
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
        <div className="col-md-10">
          <h4>387463874</h4>
          <p>Total User</p>
        </div>
        <div className="col-md-2">
          <div className="d-flex justify-content-around">
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
            <th scope="col">Country</th>
            <th scope="col">Phone Number</th>
            <th scope="col">ATTEMPTED AT </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Bangladesh</td>
            <td>012345</td>
            <td>08 Mar</td>
            <td>
              <Button
                variant="outlined"
                style={{
                  fontSize: "20px",
                  borderRadius: "5px",
                }}
              >
                <FontAwesomeIcon icon={faGear} />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NotVerifiedUsers;

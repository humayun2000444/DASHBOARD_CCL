import React, { useState } from "react";
import { Card, CardBody } from "reactstrap";
import Select from "react-select";
import { Button } from "@material-ui/core";

const Sales = () => {
  const data = [
    { name: "All", id: "All", total: 0 },
    { name: "APPLE", id: "APPLE", total: 0 },
    { name: "PAYPLE", id: "PAYPLE", total: 0 },
    { name: "CHARTNGCARD", id: "CHARTNGCARD", total: 0 },
    { name: "ADMIN", id: "ADMIN", total: 0 },
    { name: "TRANSFER", id: "TRANSFER", total: 0 },
    { name: "ANDROID", id: "ANDROID", total: 0 },
    { name: "EXTERNAL", id: "EXTERNAL", total: 0 },
    { name: "STRIPE", id: "STRIPE", total: 0 },
    { name: "BRAINTREE", id: "BRAINTREE", total: 0 },
    { name: "BKASH", id: "BKASH", total: 0 },
    { name: "ROKET", id: "ROKET", total: 0 },
    { name: "IPAY", id: "IPAY", total: 0 },
    { name: "UPAY", id: "UPAY", total: 0 },
    { name: "NEXUS", id: "NEXUS", total: 0 },
    { name: "VISA", id: "VISA", total: 0 },
    { name: "MASTERCARD", id: "MASTERCARD", total: 0 },
    { name: "AMEX", id: "AMEX", total: 0 },
    { name: "services", id: "services", total: 0 },
    { name: "NUMBER", id: "NUMBER", total: 0 },
    { name: "BONUS", id: "BONUS", total: 0 },
  ];

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
  return (
    <div>
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Sales</h4>
          </div>
          <div className="row">
            {data.map((item, index) => (
              <div className="col-md-3 mb-3">
                <div className="count-card count-primary counter-h-40 bg-gray shadow border-0">
                  <div className="count-card-title">{item.total}</div>
                  <div
                    className=""
                    onClick={() => {
                      //   history.push(`/applications`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {item.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
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
                <p>Payment Method</p>
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
                <p>Payment Date</p>
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
                <p>User Group</p>
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
            <div className="d-flex justify-content-end mb-2">
              <div>
                <Button
                  className="md-mr-3 mr-3"
                  variant="outlined"
                  style={{
                    borderColor: "gray",
                    borderRadius: "5px",
                  }}
                >
                  Reset
                </Button>
                <Button
                  className=" mr-3"
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
            <table class="table mt-5">
              <thead class="thead-light">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Phone Number / Email</th>
                  <th scope="col">Mathod Name</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Curreency</th>
                  <th scope="col">User Group</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>0134546</td>
                  <td>Extramnal</td>
                  <td>06 Mar</td>
                  <td>200</td>
                  <td>BDT</td>
                  <td>C3</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Sales;

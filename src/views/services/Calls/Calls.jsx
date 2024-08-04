import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";

const Calls = () => {
  const orderName = [
    { label: "Canada", value: 1 },
    { label: "Bangladesh", value: 2 },
    { label: "Japan", value: 3 },
    { label: "Nepal", value: 4 },
    { label: "Vutan", value: 5 },
  ];
  const [selectedOrder, setSelectedOrder] = useState({
    label: "Select...",
    value: "Country..",
  });
  const selectOrder = (label, value) => {
    setSelectedOrder({ label, value });
  };

  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await res.json();
    setData(json);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Calls</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Date & Time"
                ></FloatingLabel>
                <Form.Control placeholder="Today" />
                <div className="mb-3" style={{ marginTop: "75px" }}>
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Status Code"
                  ></FloatingLabel>
                  <Form.Control type="number" placeholder="Status Code" />
                </div>
              </div>
              <div className="col-md-4">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Phone Number Country"
                ></FloatingLabel>
                <Select
                  options={orderName}
                  value={{
                    label: selectedOrder.label,
                    value: selectedOrder.value,
                  }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
                <div className="mt-4">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Call Type"
                  ></FloatingLabel>
                  <Select
                    options={orderName}
                    value={{
                      label: selectedOrder.label,
                      value: selectedOrder.value,
                    }}
                    onChange={(opt) => selectOrder(opt.label, opt.value)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Callee Country"
                ></FloatingLabel>
                <Select
                  options={orderName}
                  value={{
                    label: selectedOrder.label,
                    value: selectedOrder.value,
                  }}
                  onChange={(opt) => selectOrder(opt.label, opt.value)}
                />
                <div className="mt-3">
                  <FloatingLabel
                    controlId="floatingInputGrid"
                    label="Username"
                  ></FloatingLabel>
                  <Form.Control type="option" placeholder="Username" />
                </div>
              </div>
            </div>
            <hr></hr>
            <div className="d-flex justify-content-between">
              <div className="ml-2">
                <h1 style={{ fontWeight: "lighter" }}>
                  Lorem ipsum dolor sit amet.
                </h1>
                <p className="ml-1">Call out</p>
              </div>
              <div className="mt-3">
                <Button
                  style={{ border: "solid 2px", borderColor: "wheat" }}
                  variant="white"
                >
                  Reset
                </Button>
                <Button variant="info" className="md-ml -2">
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div>
            <table class="table mt-5">
              <thead class="thead-light">
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">Date & Time</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Calle Country</th>
                  <th scope="col">Direction Name</th>
                  <th scope="col">Status Code</th>
                  <th scope="col">IP Address</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Sip Trunk Address / Viop Module Address</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  const {
                    id,
                    name,
                    username,
                    email,
                    phone,
                    website,
                    address,
                    company,
                  } = item;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{website}</td>
                      <td>{address.street}</td>
                      <td>{address.suite}</td>
                      <td>{address.city}</td>
                      <td>{address.zipcode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <Table>
              <thead>
                <tr className=" text-center">
                  <th>SL</th>
                  <th>Date & Time</th>
                  <th>Phone Number</th>
                  <th>Calle Country</th>
                  <th>Direction Name</th>
                  <th>Status Code</th>
                  <th>IP Address</th>
                  <th>Duration</th>
                  <th>Amount</th>
                  <th>Sip Trunk Address / Viop Module Address</th>
                </tr>
              </thead>
              <tbody className=" text-center ">
                {data.map((item) => {
                  const {
                    id,
                    name,
                    username,
                    email,
                    phone,
                    website,
                    address,
                    company,
                  } = item;
                  return (
                    <tr key={id}>
                      <td>{id}</td>
                      <td>{name}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{phone}</td>
                      <td>{website}</td>
                      <td>{address.street}</td>
                      <td>{address.suite}</td>
                      <td>{address.city}</td>
                      <td>{address.zipcode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Calls;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CardBody } from "reactstrap";
import RetailPartnerModal from "./RetailPartnerModal"; // Import the modal component

const RetailPartner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    partnerName: "",
  });

  // Add state for password visibility
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Dummy retail partners data
  const [retailPartners, setRetailPartners] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      username: "jdoe",
      password: "pass123",
      partnerName: "Partner A",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      username: "jsmith",
      password: "pass456",
      partnerName: "Partner B",
    },
  ]);

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Open modal for adding a new retail partner
  const handleOpenModal = (partnerId = null) => {
    if (partnerId) {
      const partner = retailPartners.find((p) => p.id === partnerId);
      setFormData(partner);
      setSelectedPartnerId(partnerId);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        partnerName: "",
      });
      setSelectedPartnerId(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      partnerName: "",
    });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submit (add or update retail partner)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPartnerId) {
      // Update retail partner
      const updatedPartners = retailPartners.map((p) =>
        p.id === selectedPartnerId ? { ...p, ...formData } : p
      );
      setRetailPartners(updatedPartners);
    } else {
      // Add new retail partner
      const newPartner = {
        id: retailPartners.length + 1,
        ...formData,
      };
      setRetailPartners([...retailPartners, newPartner]);
    }
    handleCloseModal();
  };

  // Handle delete retail partner
  const handleDeletePartner = (partnerId) => {
    const updatedPartners = retailPartners.filter((p) => p.id !== partnerId);
    setRetailPartners(updatedPartners);
  };

  return (
    <div>
      <RetailPartnerModal
        show={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Retail Partners</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Partner:</h6>
                <Form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </Form>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <Button
                  style={{ padding: "7px 30px" }}
                  onClick={() => handleOpenModal()}
                >
                  Add Partner
                </Button>
              </div>
            </div>
          </div>

          <div
            className="overflow-auto"
            style={{ maxWidth: "100%", overflowX: "scroll" }}
          >
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th align="right">Username</th>
                  <th align="right">Password</th>
                  <th align="right">Partner Name</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {retailPartners.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    {/* Password Cell */}
                    <TableCell
                      onClick={() => togglePasswordVisibility(row.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {visiblePasswords[row.id] ? row.password : "********"}
                    </TableCell>
                    <TableCell>{row.partnerName}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpenModal(row.id)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeletePartner(row.id)}
                      >
                        Delete
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default RetailPartner;

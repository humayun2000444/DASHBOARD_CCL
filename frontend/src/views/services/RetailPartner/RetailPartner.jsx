import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CardBody } from "reactstrap";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";
import RetailPartnerModal from "./RetailPartnerModal"; // Import the modal component

const RetailPartner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    partnerName: "",
  });

  // Add state for password visibility
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Dummy retail partners data
  const [retailPartners, setRetailPartners] = useState([]);

  const fetchRetailPartners = async () => {
    try {
      const data = await retailPartnerServices.fetchAllRetailPartners();
      setRetailPartners(data);
    } catch (error) {
      console.log("Error fetching retail partners:" + error);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Open modal for adding or editing a retail partner
  const handleOpenModal = (partnerId = null) => {
    if (partnerId) {
      const partner = retailPartners.find((p) => p.id === partnerId);
      setFormData({
        id: partnerId,
        firstName: partner.firstName,
        lastName: partner.lastName,
        userName: partner.userName,
        password: partner.password,
        partnerName: partner.partner.partnerName,
      });
      setSelectedPartnerId(partnerId);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        password: "",
        partnerName: "",
        id: "",
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

  // Handle delete retail partner
  const handleDeletePartner = async (id) => {
    try {
      await retailPartnerServices.deleteRetailPartner({ id });
      fetchRetailPartners(); // Fetch updated data after deletion
    } catch (error) {
      console.error("Error deleting retail partner:", error);
    }
  };

  useEffect(() => {
    fetchRetailPartners();
  }, []);

  return (
    <div>
      <RetailPartnerModal
        show={modalOpen}
        handleClose={handleCloseModal}
        formData={formData}
        fetchRetailPartners={fetchRetailPartners} // Pass fetchRetailPartners to re-fetch data after form submission
        setModalOpen={setModalOpen}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">SIP Accounts</h4>
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
            </div>
          </div>

          <div
            className="overflow-auto"
            style={{ maxWidth: "100%", overflowX: "scroll" }}
          >
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>Name</th>
                  <th align="right">Username</th>
                  <th align="right">Partner Name</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {retailPartners?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.firstName + " " + row.lastName}</TableCell>
                    <TableCell>{row.userName}</TableCell>
                    <TableCell>{row.partner.partnerName}</TableCell>
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

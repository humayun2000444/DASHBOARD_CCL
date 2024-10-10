import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
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

  const [visiblePasswords, setVisiblePasswords] = useState({}); // Handle password visibility
  const [retailPartners, setRetailPartners] = useState([]); // Retail partners data

  // Fetch retail partners data
  const fetchRetailPartners = async () => {
    try {
      const data = await retailPartnerServices.fetchAllRetailPartners();
      setRetailPartners(data);
    } catch (error) {
      console.log("Error fetching retail partners:" + error);
    }
  };

  useEffect(() => {
    fetchRetailPartners();
  }, []);

  // Confirm delete action
  const handleDeleteRetailPartner = async (id) => {
    const item = retailPartners.find((item) => item.id === id);

    toast(
      (t) => (
        <div>
          <h6>
            Are you sure you want to delete the Retail Partner
            <strong>"{item.userName}"</strong>?
          </h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={async () => {
                try {
                  toast.dismiss(t.id);
                  await retailPartnerServices.deleteRetailPartner({ id });
                  fetchRetailPartners(); // Fetch updated data
                  toast.success(
                    `Retail Partner "${item.userName}" deleted successfully!`
                  );
                } catch (error) {
                  console.error("Error deleting Retail Partner", error);
                  toast.error("Failed to delete Retail Partner!");
                }
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  // Open modal for adding/editing retail partner
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

  return (
    <div>
      <RetailPartnerModal
        show={modalOpen}
        handleClose={() => setModalOpen(false)}
        formData={formData}
        fetchRetailPartners={fetchRetailPartners}
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

          <div className="overflow-auto" style={{ maxWidth: "100%" }}>
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
                        onClick={() => handleDeleteRetailPartner(row.id)}
                      >
                        Delete
                      </Button>
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

import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CardBody } from "reactstrap";
import retailPartnerServices from "../../../apiServices/RetailPartner/RetailPartnerServices";
import RetailPartnerModal from "./RetailPartnerModal"; // Import the modal component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar state
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state
  const [partnerToDelete, setPartnerToDelete] = useState(null); // Partner to delete

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

  // Handle delete button click - open confirmation dialog
  const handleDeleteClick = (id) => {
    setPartnerToDelete(id);
    setDialogOpen(true);
  };

  // Confirm delete action
  const handleDeleteConfirm = async () => {
    try {
      await retailPartnerServices.deleteRetailPartner({ id: partnerToDelete });
      setDialogOpen(false); // Close dialog
      fetchRetailPartners(); // Fetch updated data
      setSnackbarOpen(true); // Show success snackbar
    } catch (error) {
      console.error("Error deleting retail partner:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
                        onClick={() => handleDeleteClick(row.id)}
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

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Retail partner deleted successfully!
        </Alert>
      </Snackbar>

      {/* Dialog for confirmation */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this retail partner?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RetailPartner;

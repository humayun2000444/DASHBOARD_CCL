import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Form, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import SmsRoutingModal from "./SmsRoutingModal";
import smsRouteServices from "../../../apiServices/SmsRouteService/SmsRouteService";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import toast from "react-hot-toast";

const SmsRouting = () => {
  const [routes, setRoutes] = useState([]);
  const [partners, setPartners] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    routeName: "",
    description: "",
    field5: "",
    zone: "",
    nationalOrInternational: "",
    field4: "",
    switchId: 1,
    idPartner: "",
  });
  const [selectedRouteId, setRouteId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchRoutes();
    fetchPartner();
  }, []);

  const fetchPartner = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const data = await smsRouteServices.fetchRoutes();
      setRoutes(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleOpenModal = (routeId = null) => {
    setRouteId(routeId);
    setModalOpen(true);
    if (routeId) {
      fetchPartnerData(routeId);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      routeName: "",
      description: "",
      field5: "",
      zone: "",
      nationalOrInternational: "",
      field4: "",
      switchId: 1,
      idPartner: "",
    });
    setRouteId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      routeName: formData.routeName,
      description: formData.description,
      field5: formData.field5,
      zone: formData.zone,
      nationalOrInternational: formData.nationalOrInternational,
      field4: formData.field4,
      switchId: 1,
      idPartner: formData.idPartner,
    };
    try {
      if (selectedRouteId) {
        await smsRouteServices.updateRoute(selectedRouteId, data);
        toast.success("Route information updated successfully!");
      } else {
        await smsRouteServices.createRoute(data, userInfo.token);
        toast.success("Route created successfully!");
      }
      handleCloseModal();
      fetchRoutes();
    } catch (error) {
      console.error("Error adding/updating permission:", error);
      toast.error(
        "Failed to save partner information. Please try again.",
        `${error}`
      );
    }
    console.log(data);
  };

  const fetchPartnerData = async (routeId) => {
    try {
      console.log(routeId);
      const data = await smsRouteServices.fetchRouteById(
        routeId,
        userInfo.token
      );
      setFormData({
        routeName: data.routeName || "",
        description: data.description || "",
        field5: data.field5 || "",
        zone: data.zone || "",
        nationalOrInternational: data.nationalOrInternational || "",
        field4: data.field4 || "",
        idPartner: data.idPartner || "",
      });
    } catch (error) {
      console.error("Error fetching partner data:", error);
    }
  };

  const handleDeleteRoute = async (routeId) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this Route?</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "10px",
              }}
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#EA5455",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={async () => {
                try {
                  toast.dismiss(t.id);
                  const token = userInfo.token;
                  if (!token) {
                    throw new Error("No authentication token available");
                  }
                  await smsRouteServices.deleteRoute(routeId, token);
                  fetchRoutes();
                  toast.success("Route deleted successfully!");
                } catch (error) {
                  console.error("Error deleting partner:", error);
                  toast.error("Failed to delete partner!", `${error}`);
                }
              }}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return (
    <div>
      <SmsRoutingModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        partners={partners}
        handleChange={handleChange}
        title={selectedRouteId ? "Update partner" : "Add Partner"}
        buttonText={selectedRouteId ? "Update" : "Save"}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Route</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Sms Routing:</h6>
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
              <div className="col-md-2"></div>
              <div
                className="col-md-6 d-flex justify-content-end"
                style={{ marginTop: "23px" }}
              >
                <Button
                  style={{ padding: "7px 30px" }}
                  onClick={() => handleOpenModal()}
                >
                  Add Sms Routing
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
                  <th>ID Route</th>
                  <th align="right">Route Name</th>
                  <th align="right">ID Partner</th>
                  <th align="right">National / International</th>
                  <th align="right">Description</th>
                  <th align="right">Channel</th>
                  <th align="right">Route Addrres</th>
                  <th align="right">Zone</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {routes.map((row, i) => (
                  <TableRow key={row?.idroute}>
                    <TableCell>{row?.idroute}</TableCell>
                    <TableCell>{row?.routeName}</TableCell>
                    <TableCell>{row?.idPartner}</TableCell>
                    <TableCell>
                      {row?.nationalOrInternational === 1
                        ? "National"
                        : "International"}
                    </TableCell>

                    <TableCell>{row?.description}</TableCell>
                    <TableCell>{row?.field4}</TableCell>
                    <TableCell>{row?.field5}</TableCell>
                    <TableCell>{row?.zone}</TableCell>
                    <TableCell>
                      {/* <IconButton
                        aria-label="edit"
                        onClick={() => handleOpenModal(row.id)}
                        style={{ color: "green" }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteRoute(row.id)}
                        style={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton> */}
                      <Button onClick={() => handleOpenModal(row.idroute)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteRoute(row.idroute)}
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
export default SmsRouting;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import Select from "react-select";
import { CardBody } from "reactstrap";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import smsRouteServices from "../../../apiServices/SmsRouteService/SmsRouteService";
import Pagination from "../Pagination/Pagination";
import SmsRoutingModal from "./SmsRoutingModal";

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
  const [dataPerPage, setDataPerPage] = useState(10);
  const [entity, setEntity] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // User select data per page
  const dataSizeArr = [10, 15, 20, 30, 50];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setLoading(true);
    setDataPerPage(value);
  };

  useEffect(() => {
    fetchRoutes();
    fetchPartner();
  }, [currentPage, dataPerPage]);

  const fetchPartner = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching authRoles:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const data = await smsRouteServices.fetchRoutes();
      setRoutes(
        data.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage)
      );
      setEntity(data.length);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
    setLoading(false);
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
        title={selectedRouteId ? "Update Route" : "Add Route"}
        buttonText={selectedRouteId ? "Update" : "Save"}
      />

      <Card
        style={{
          borderRadius: "0",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <CardBody>
          <div className="container-fluid">
            <div
              className="row mb-3"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="col-md-4" style={{ padding: "0" }}>
                <Form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "6px 30px" }} type="submit">
                    Find
                  </Button>
                </Form>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <div className="d-flex align-items-center mr-1">
                  <h6 className="mr-2 mb-0">Show : </h6>
                  <Select
                    defaultValue={dataSizeName[0]}
                    options={dataSizeName}
                    onChange={(e) => selectDataSize(e.value)}
                    className="w-auto"
                  />
                </div>
                <Button
                  style={{ padding: "6px 30px" }}
                  onClick={() => handleOpenModal()}
                >
                  Add Route
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

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};
export default SmsRouting;

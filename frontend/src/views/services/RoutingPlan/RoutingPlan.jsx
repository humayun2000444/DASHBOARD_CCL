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
import permissionServices from "../../../apiServices/PermissionServices/PermissionServices";
import RoutingModal from "./RoutingModal";

const RoutingPlan = () => {
  const [permissions, setRoutings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    prefix: "",
    profileName: "",
    ipAddress: "",
    context: "",
  });
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await permissionServices.fetchPermissions();
      setRoutings(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleOpenModal = (permissionId = null) => {
    setSelectedPermissionId(permissionId);
    setModalOpen(true);
    if (permissionId) {
      fetchPermissionData(permissionId);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({ prefix: "", profileName: "", ipAddress: "", context: "" });
    setSelectedPermissionId(null);
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
      prefix: formData.prefix,
      profileName: formData.profileName,
      ipAddress: formData.ipAddress,
      context: formData.context,
    };
    try {
      if (selectedPermissionId) {
        await permissionServices.updatePermission(selectedPermissionId, data);
      } else {
        await permissionServices.createPermission(data, userInfo.token);
      }
      handleCloseModal();
      fetchPermissions();
    } catch (error) {
      console.error("Error adding/updating permission:", error);
    }
    console.log(data);
  };

  const fetchPermissionData = async (permissionId) => {
    try {
      const data = await permissionServices.fetchPermissionById(
        permissionId,
        userInfo.token
      );
      setFormData({
        prefix: data.prefix || "",
        profileName: data.profileName || "",
        ipAddress: data.ipAddress || "",
        context: data.context || "",
      });
    } catch (error) {
      console.error("Error fetching permission data:", error);
    }
  };

  const handleDeletePermission = async (permissionId) => {
    try {
      await permissionServices.deletePermission(permissionId);
      fetchPermissions();
    } catch (error) {
      console.error("Error removing permission:", error);
    }
  };

  const data = [
    {
      id: 1,
      prefix: "Prefix 1",
      priority: 1,
      balanceShare: 10,
      routeType: "Type A",
      route: "Route 1",
      techPrefix: "Tech 1",
      callsLimits: 100,
      lcr: true,
      status: "Active",
    },
    {
      id: 2,
      prefix: "Prefix 2",
      priority: 2,
      balanceShare: 20,
      routeType: "Type B",
      route: "Route 2",
      techPrefix: "Tech 2",
      callsLimits: 200,
      lcr: false,
      status: "Inactive",
    },
    {
      id: 3,
      prefix: "Prefix 3",
      priority: 3,
      balanceShare: 30,
      routeType: "Type C",
      route: "Route 3",
      techPrefix: "Tech 3",
      callsLimits: 300,
      lcr: true,
      status: "Active",
    },
    {
      id: 4,
      prefix: "Prefix 4",
      priority: 4,
      balanceShare: 40,
      routeType: "Type D",
      route: "Route 4",
      techPrefix: "Tech 4",
      callsLimits: 400,
      lcr: false,
      status: "Inactive",
    },
    {
      id: 5,
      prefix: "Prefix 5",
      priority: 5,
      balanceShare: 50,
      routeType: "Type E",
      route: "Route 5",
      techPrefix: "Tech 5",
      callsLimits: 500,
      lcr: true,
      status: "Active",
    },
    {
      id: 6,
      prefix: "Prefix 6",
      priority: 6,
      balanceShare: 60,
      routeType: "Type F",
      route: "Route 6",
      techPrefix: "Tech 6",
      callsLimits: 600,
      lcr: false,
      status: "Inactive",
    },
    {
      id: 7,
      prefix: "Prefix 7",
      priority: 7,
      balanceShare: 70,
      routeType: "Type G",
      route: "Route 7",
      techPrefix: "Tech 7",
      callsLimits: 700,
      lcr: true,
      status: "Active",
    },
    {
      id: 8,
      prefix: "Prefix 8",
      priority: 8,
      balanceShare: 80,
      routeType: "Type H",
      route: "Route 8",
      techPrefix: "Tech 8",
      callsLimits: 800,
      lcr: false,
      status: "Inactive",
    },
    {
      id: 9,
      prefix: "Prefix 9",
      priority: 9,
      balanceShare: 90,
      routeType: "Type I",
      route: "Route 9",
      techPrefix: "Tech 9",
      callsLimits: 900,
      lcr: true,
      status: "Active",
    },
    {
      id: 10,
      prefix: "Prefix 10",
      priority: 10,
      balanceShare: 100,
      routeType: "Type J",
      route: "Route 10",
      techPrefix: "Tech 10",
      callsLimits: 1000,
      lcr: false,
      status: "Inactive",
    },
  ];

  return (
    <div>
      <RoutingModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title={selectedPermissionId ? "Update Route" : "Add Route"}
        buttonText={selectedPermissionId ? "Update" : "Add Route"}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Routing Plan</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Route:</h6>
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
              <div
                className="col-md-8 d-flex justify-content-end"
                style={{ marginTop: "23px" }}
              >
                <Button
                  style={{ padding: "7px 30px" }}
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
                  <th>ID</th>
                  <th align="right">Prefix</th>
                  <th align="right">Priority</th>
                  <th align="right">Share</th>
                  <th align="right">Route Type</th>
                  <th align="right">Route</th>
                  <th align="right">Tech Prefix</th>
                  <th align="right">Calls Limits</th>
                  <th align="right">LCR</th>
                  <th align="right">Status</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.prefix}</TableCell>
                    <TableCell>{row.priority}</TableCell>
                    <TableCell>{row.balanceShare}</TableCell>
                    <TableCell>{row.routeType}</TableCell>
                    <TableCell>{row.route}</TableCell>
                    <TableCell>{row.techPrefix}</TableCell>
                    <TableCell>{row.callsLimits}</TableCell>
                    <TableCell>{row.lcr ? "Yes" : "No"}</TableCell>
                    <TableCell>{row.status}</TableCell>
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
                        onClick={() => handleDeletePermission(row.id)}
                        style={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton> */}
                      <Button onClick={() => handleOpenModal(row.id)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeletePermission(row.id)}
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

export default RoutingPlan;

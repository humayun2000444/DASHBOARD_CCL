import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Form, Button } from "react-bootstrap";
import permissionServices from "../../../apiServices/PermissionServices/PermissionServices";
import { WholeSaleClientModal } from "./WholeSaleClientModal";

const WholeSaleClients = () => {
  const [permissions, setRoutings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    permission: "",
    description: "",
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
    setFormData({ permission: "", description: "" });
    setSelectedPermissionId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "permission" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.permission,
      description: formData.description,
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
  };

  const fetchPermissionData = async (permissionId) => {
    try {
      const data = await permissionServices.fetchPermissionById(
        permissionId,
        userInfo.token
      );
      setFormData({
        permission: data.name || "",
        description: data.description || "",
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
      <WholeSaleClientModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title={selectedPermissionId ? "Update Client" : "Add Client"}
        buttonText={selectedPermissionId ? "Update" : "Add Client"}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Wholesale clients</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Client : </h6>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "7px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div
                className="col-md-8 d-flex justify-content-end"
                style={{ marginTop: "23px" }}
              >
                <Button
                  style={{ padding: "7px 30px" }}
                  onClick={() => handleOpenModal()}
                >
                  Add Client
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
                  <th></th>
                  <th>ID</th>
                  <th align="right">Login</th>
                  <th align="right">Tariff</th>
                  <th align="right">Reseller</th>
                  <th align="right">Balance</th>
                  <th align="right">Credit allowed</th>
                  <th align="right">Status</th>
                </TableRow>
              </TableHead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ padding: "2px 16px", minWidth: "50px" }}></td>
                    <td style={{ padding: "2px 16px" }}>{i + 1}</td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {row.prefix}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "120px" }}>
                      {row.priority}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "120px" }}>
                      {row.balanceShare}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {row.routeType}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {" "}
                      {row.route}
                    </td>

                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {" "}
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default WholeSaleClients;

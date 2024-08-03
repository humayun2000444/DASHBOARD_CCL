import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Form, Button } from "react-bootstrap";
import permissionServices from "../../../apiServices/PermissionServices/PermissionServices";
import RegistarsModal from "./RegistarsModal";

const Registrars = () => {
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
      name: "Server A",
      ip_number: "192.168.1.1",
      traffic: "120GB",
      status_name: "Active",
      call_limits: 50,
    },
    {
      id: 2,
      name: "Server B",
      ip_number: "192.168.1.2",
      traffic: "85GB",
      status_name: "Inactive",
      call_limits: 30,
    },
    {
      id: 3,
      name: "Server C",
      ip_number: "192.168.1.3",
      traffic: "150GB",
      status_name: "Active",
      call_limits: 60,
    },
    {
      id: 4,
      name: "Server D",
      ip_number: "192.168.1.4",
      traffic: "200GB",
      status_name: "Active",
      call_limits: 80,
    },
    {
      id: 5,
      name: "Server E",
      ip_number: "192.168.1.5",
      traffic: "75GB",
      status_name: "Inactive",
      call_limits: 20,
    },
    {
      id: 6,
      name: "Server F",
      ip_number: "192.168.1.6",
      traffic: "60GB",
      status_name: "Active",
      call_limits: 40,
    },
    {
      id: 7,
      name: "Server G",
      ip_number: "192.168.1.7",
      traffic: "90GB",
      status_name: "Inactive",
      call_limits: 35,
    },
    {
      id: 8,
      name: "Server H",
      ip_number: "192.168.1.8",
      traffic: "110GB",
      status_name: "Active",
      call_limits: 55,
    },
    {
      id: 9,
      name: "Server I",
      ip_number: "192.168.1.9",
      traffic: "95GB",
      status_name: "Inactive",
      call_limits: 45,
    },
    {
      id: 10,
      name: "Server J",
      ip_number: "192.168.1.10",
      traffic: "130GB",
      status_name: "Active",
      call_limits: 65,
    },
  ];

  return (
    <div>
      <RegistarsModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title={selectedPermissionId ? "Update" : "Registar"}
        buttonText={selectedPermissionId ? "Update" : "Registar"}
      />
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Registar</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Route : </h6>
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
                  Registar
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
                  <th align="right">Name</th>
                  <th align="right">Ip number</th>
                  <th align="right">Call limit</th>
                  <th align="right">Tariff</th>
                  <th align="right">Status</th>
                  <th align="right">Actions</th>
                </TableRow>
              </TableHead>
              <tbody>
                {data.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ padding: "2px 16px", minWidth: "50px" }}></td>
                    <td style={{ padding: "2px 16px" }}>{i + 1}</td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "120px" }}>
                      {row.ip_number}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "120px" }}>
                      {row.call_limits}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {row.traffic}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      {" "}
                      {row.status_name}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "100px" }}>
                      .
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

export default Registrars;

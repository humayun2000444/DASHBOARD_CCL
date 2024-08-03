import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Form, Button } from "react-bootstrap";
import PermissionForm from "./PermissionForm";
import permissionServices from "../../../apiServices/PermissionServices/PermissionServices";

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ permission: "", description: "" });
  const [selectedPermissionId, setSelectedPermissionId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await permissionServices.fetchPermissions();
      setPermissions(data);
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

  return (
    <div>
      <PermissionForm
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title={selectedPermissionId ? "Update Permission" : "Add Permission"}
        buttonText={selectedPermissionId ? "Update" : "Add Permission"}
      />

      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Permission Management</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Permission : </h6>
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
                  Add Permission
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
                  <th align="right">Permission</th>
                  <th align="right">Description</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <tbody>
                {permissions.map((row, i) => (
                  <tr key={row.id}>
                    <td style={{ padding: "2px 16px" }}>{i + 1}</td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      {row.description}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      <Button onClick={() => handleOpenModal(row.id)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeletePermission(row.id)}
                      >
                        Delete
                      </Button>
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

export default PermissionManagement;

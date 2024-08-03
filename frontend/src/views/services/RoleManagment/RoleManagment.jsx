import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { CardBody } from "reactstrap";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Form, Button } from "react-bootstrap";
import roleServices from "../../../apiServices/RoleServices/RoleServices";
import RoleForm from "./RoleForm";

const RoleManagment = () => {
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ role: "", description: "" });
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await roleServices.fetchRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const handleOpenModal = (roleId = null) => {
    setSelectedRoleId(roleId);
    setModalOpen(true);
    if (roleId) {
      fetchRoleData(roleId);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({ role: "", description: "" });
    setSelectedRoleId(null);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "role" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.role,
      description: formData.description,
    };
    try {
      if (selectedRoleId) {
        await roleServices.updateRole(selectedRoleId, data);
      } else {
        await roleServices.createRole(data, userInfo.token);
      }
      handleCloseModal();
      fetchRoles();
    } catch (error) {
      console.error("Error adding/updating permission:", error);
    }
  };

  const fetchRoleData = async (roleId) => {
    try {
      const data = await roleServices.fetchRoleById(roleId, userInfo.token);
      setFormData({
        role: data.name || "",
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching permission data:", error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await roleServices.deleteRole(roleId);
      fetchRoles();
    } catch (error) {
      console.error("Error removing permission:", error);
    }
  };

  return (
    <div>
      <RoleForm
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title={selectedRoleId ? "Update Role" : "Add Role"}
        buttonText={selectedRoleId ? "Update" : "Add Role"}
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
                  Add Role
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
                  <th align="right">Role</th>
                  <th align="right">Description</th>
                  <th align="right">Action</th>
                </TableRow>
              </TableHead>
              <tbody>
                {roles.map((row, i) => (
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
                        onClick={() => handleDeleteRole(row.id)}
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

export default RoleManagment;

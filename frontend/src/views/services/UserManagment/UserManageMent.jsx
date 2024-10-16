//  refector

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { CardBody } from "reactstrap";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import roleServices from "../../../apiServices/RoleServices/RoleServices";
import userServices from "../../../apiServices/UserServices/UserServices";
import UserFormModal from "./UserFormModal";

const UserManagement = () => {
  const initalState = {
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    partnerId: "",
    userStatus: "",
    authRoles: [],
  };
  const [passwordError, setPasswordError] = useState("");
  const [users, setUsers] = useState([]);
  const [authRoles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(initalState);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [partners, setPartners] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const fetchUsers = async () => {
    try {
      const data = await userServices.fetchAllUsers(userInfo.token);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Handle error
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await roleServices.fetchRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching authRoles:", error);
    }
  };

  const fetchPartners = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchPartners();
  }, []);

  const handleModalOpen = (userId = null) => {
    setSelectedUserId(userId);
    setModalOpen(true);
    if (userId) {
      // Fetch user data if updating
      fetchUserData(userId);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUserId(null);
    setFormData(initalState);
    setPasswordError("");
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

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    const userData = {
      ...formData,
      authRoles: formData.authRoles.map((role) => ({ name: role.name })),
    };

    try {
      if (selectedUserId) {
        await userServices.updateUser(selectedUserId, userData, userInfo.token);
      } else {
        await userServices.createUser(userData, userInfo.token);
      }
      handleModalClose();
      fetchUsers();
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const fetchUserData = async (id) => {
    try {
      const data = await userServices.fetchUserById(id, userInfo.token);
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNo: data.phoneNo,
        email: data.email,
        userStatus: data.userStatus,
        partnerId: data.partnerId,
        authRoles: data.authRoles.map((role) => ({
          name: role.name,
          label: role.name,
        })),
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userServices.deleteUser(id, userInfo.token);
      fetchUsers();
    } catch (error) {
      console.error("Error removing user:", error);
      // Handle error
    }
  };

  const adminRoleOptions = authRoles.map((role) => ({
    name: role.name,
    name: role.name,
  }));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 900,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <UserFormModal
        open={modalOpen}
        handleClose={handleModalClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        adminRole={adminRoleOptions}
        partners={partners}
        passwordError={passwordError}
        isUpdate={!!selectedUserId}
        style={style}
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
            <div className="row mb-3">
              <div className="col-md-4" style={{ padding: "0" }}>
                <form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    style={{ marginRight: "10px" }}
                  />
                  <Button style={{ padding: "6px 30px" }} type="submit">
                    Find
                  </Button>
                </form>
              </div>
              <div
                className="col-md-8 d-flex justify-content-end"
              >
                <Button
                  style={{ padding: "6px 30px" }}
                  onClick={() => handleModalOpen()}
                >
                  Add User
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
                  <th align="right">Name</th>
                  <th align="right">Email</th>
                  <th align="right">Role</th>
                  <th align="right">Created on</th>
                  <th align="right">Status</th>
                  <th align="right">Actions</th>
                </TableRow>
              </TableHead>
              <tbody>
                {users.map((row, i) => (
                  <tr key={row.name}>
                    <td style={{ padding: "2px 16px" }}>{i + 1}</td>
                    <td
                      component="th"
                      scope="row"
                      style={{ padding: "2px 16px", minWidth: "220px" }}
                    >
                      {row.firstName} {row.lastName}
                    </td>
                    <td
                      component="th"
                      scope="row"
                      style={{ padding: "2px 16px", minWidth: "220px" }}
                    >
                      {row.email}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      {row.authRoles.map((role) => (
                        <span key={role.name}> {role.name}</span>
                      ))}
                    </td>{" "}
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      {row.createdOn}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      {row.userStatus}
                    </td>
                    <td style={{ padding: "2px 16px", minWidth: "220px" }}>
                      <Button onClick={() => handleModalOpen(row.id)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(row.id)}
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

export default UserManagement;

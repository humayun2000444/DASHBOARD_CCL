import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import { CardBody } from "reactstrap";
import didPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";
import "../../../assets/scss/core/variables/_variables.scss";
import Pagination from "../Pagination/Pagination";
import NewDidPoolModal from "./NewDidPoolModal";

const NewDidPoolManagement = () => {
  const history = useHistory();
  const [didPools, setDidPools] = useState([]);
  const [modalOpen, setModalOpen] = useState({ openType: "", open: false });

  const [formData, setFormData] = useState({ name: "", description: "" });
  const [selectedDidPoolId, setDidPoolId] = useState(null);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [entityCount, setEntityCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const dataSizeArr = [10, 15, 20, 30, 50];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => setDataPerPage(value);

  useEffect(() => {
    fetchDidPools();
  }, [currentPage, dataPerPage, searchTerm]);

  const fetchDidPools = async () => {
    setLoading(true);
    try {
      const response = await didPoolServices.getDidPools();
      setDidPools(
        response.slice(
          (currentPage - 1) * dataPerPage,
          currentPage * dataPerPage
        )
      );
      setEntityCount(response.length);
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred";
      const errorCode = error.code || "No code";

      console.error("Error fetching DID pools:", {
        code: errorCode,
        message: errorMessage,
      });

      toast.error(
        `Failed to fetch DID pools (Code: ${errorCode}): ${errorMessage}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (didPoolId = null) => {
    if (didPoolId) {
      const selectedDidPool = didPools.find((pool) => pool.id === didPoolId);
      setFormData({
        name: selectedDidPool?.name || "",
        description: selectedDidPool?.description || "",
      });
    } else {
      setFormData({ name: "", description: "" });
    }
    setModalOpen({ openType: didPoolId ? "Update" : "Add", open: true });
    setDidPoolId(didPoolId);
  };

  const handleCloseModal = () => setModalOpen({ openType: "", open: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name.trim()]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    try {
      if (selectedDidPoolId) {
        await didPoolServices.updateDidPool(
          selectedDidPoolId,
          data,
          userInfo.token
        );
        toast.success("DID pool updated successfully!");
      } else {
        await didPoolServices.createDidPool(data, userInfo.token);
        toast.success("DID pool created successfully!");
      }
      handleCloseModal();
      fetchDidPools();
    } catch (error) {
      console.error("Error adding/updating DID pool:", error);
      toast.error("Failed to save DID pool information. Please try again.");
    }
  };

  const handleDeleteDidPool = async (didPoolId, didPoolName) => {
    toast(
      (t) => (
        <div>
          <h6>
            Are you sure you want to delete the DID pool{" "}
            <strong>"{didPoolName}"</strong>?
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
                  await didPoolServices.deleteDidPool(
                    didPoolId,
                    userInfo.token
                  );
                  fetchDidPools();
                  toast.success(
                    `DID pool "${didPoolName}" deleted successfully!`
                  );
                } catch (error) {
                  console.error("Error deleting DID pool:", error);
                  toast.error("Failed to delete DID pool!");
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

  const handlePoolClick = (poolId, poolName) => {
    history.push({
      pathname: `/AssignDid/${poolId}`,
      state: { poolName },
    });
  };

  return (
    <div>
      <NewDidPoolModal
        open={modalOpen.open}
        title={modalOpen.openType === "Update" ? "Update " : "Add "}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        handleChangeDetail={handleChange}
        formData={formData}
      />
      <Card>
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Did Pool</h4>
          </div>
          <div className="mt-4 container-fluid">
            <div className="row mb-3">
              <div className="col-md-4">
                <h6>Find Did Pool:</h6>
                <Form style={{ display: "flex", alignItems: "center" }}>
                  <Form.Control
                    placeholder="Search..."
                    onChange={handleSearchChange} // Add search handler
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
                <div className="d-flex align-items-center mr-1">
                  <h6 className="mr-2 mb-0">Show: </h6>
                  <Select
                    defaultValue={dataSizeName[0]}
                    options={dataSizeName}
                    onChange={(e) => selectDataSize(e.value)}
                    className="w-auto"
                  />
                </div>
                <Button
                  style={{ padding: "7px 30px" }}
                  onClick={() => handleOpenModal()}
                >
                  Add Did Pool
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
                  <th>Pool Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {didPools.map((row) => (
                  <TableRow key={row?.id}>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>
                      {row?.description || "No description available"}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="info"
                        onClick={() => handlePoolClick(row.id, row.name)}
                      >
                        Manage Pool
                      </Button>{" "}
                      <Button onClick={() => handleOpenModal(row.id)}>
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteDidPool(row.id, row.name)}
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
            totalData={entityCount}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default NewDidPoolManagement;

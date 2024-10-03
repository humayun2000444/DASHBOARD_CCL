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
import didPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";
import Pagination from "../Pagination/Pagination";
import NewDidPoolEditModal from "./NewDidPoolEditModal";

const NewDidPool = () => {
  const [didPools, setDidPools] = useState([]); // store data
  console.log(didPools)
  const [modalOpen, setModalOpen] = useState({ openType: "", open: false }); // modal
  const [formData, setFormData] = useState({
    partnerName: "",
    description: "",
  }); //
  const [selectedDidPoolId, setDidPoolId] = useState(null); // Renamed for clarity
  const [dataPerPage, setDataPerPage] = useState(10);
  const [entityCount, setEntityCount] = useState(0); // Renamed for clarity
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const dataSizeArr = [10, 15, 20, 30, 50];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setDataPerPage(value);
  };

  useEffect(() => {
    fetchDidPools(); // Corrected function call
  }, [currentPage, dataPerPage]);

  const fetchDidPools = async () => {
    setLoading(true); // Start loading
    try {
      const response = await didPoolServices.getDidPools(); // Updated to correct API call
      const data = response; // Adjust this if necessary based on your API response

      // Pagination logic
      setDidPools(data.slice((currentPage - 1) * dataPerPage, currentPage * dataPerPage));
      setEntityCount(data.length); // Update total entities
    } catch (error) {
      console.error("Error fetching DID pools:", error);
      toast.error("Failed to fetch DID pools."); // Toast message for error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleOpenModal = (didPoolId = null) => {
    setModalOpen({
      openType: didPoolId ? "Update" : "Add",
      open: true,
    });
    setDidPoolId(didPoolId); // Set selected DID pool ID
  };

  const handleCloseModal = () => {
    setModalOpen({ openType: "", open: false });
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
      ...formData,
    };
    try {
      if (selectedDidPoolId) {
        await didPoolServices.updateDidPool(selectedDidPoolId, data, userInfo.token);
        toast.success("DID pool updated successfully!");
      } else {
        await didPoolServices.createDidPool(data, userInfo.token);
        toast.success("DID pool created successfully!");
      }
      handleCloseModal();
      fetchDidPools(); // Refresh data after submit
    } catch (error) {
      console.error("Error adding/updating DID pool:", error);
      toast.error("Failed to save DID pool information. Please try again.");
    }
  };

  const handleDeleteDidPool = async (didPoolId) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this DID pool?</p>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
            <button onClick={() => toast.dismiss(t.id)}>Cancel</button>
            <button onClick={async () => {
              try {
                toast.dismiss(t.id);
                await didPoolServices.deleteDidPool(didPoolId, userInfo.token);
                fetchDidPools(); // Refresh data after delete
                toast.success("DID pool deleted successfully!" +  "" + didPoolId);
              } catch (error) {
                console.error("Error deleting DID pool:", error);
                toast.error("Failed to delete DID pool!");
              }
            }}>Confirm Delete</button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center" }
    );
  };

  return (
    <div>
      <NewDidPoolEditModal
        open={modalOpen.open}
        title={modalOpen.openType === "Update" ? "Update" : "Add"}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        handleChange ={handleChange}
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
                  <Form.Control placeholder="Search..." style={{ marginRight: "10px" }} />
                  <Button style={{ padding: "7px 30px" }} type="submit">Find</Button>
                </Form>
              </div>
              <div className="col-md-6 d-flex justify-content-end" style={{ marginTop: "23px" }}>
                <div className="d-flex align-items-center mr-1">
                  <h6 className="mr-2 mb-0">Show: </h6>
                  <Select
                    defaultValue={dataSizeName[0]}
                    options={dataSizeName}
                    onChange={(e) => selectDataSize(e.value)}
                    className="w-auto"
                  />
                </div>
                <Button style={{ padding: "7px 30px" }} onClick={() => handleOpenModal()}>
                  Add New Pool
                </Button>
              </div>
            </div>
          </div>

          <div className="overflow-auto" style={{ maxWidth: "100%", overflowX: "scroll" }}>
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>Pool Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </TableRow>
              </TableHead>
              <TableBody>
                { (
                  didPools.map((row) => (
                    <TableRow key={row?.id}>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.description || "No description available"}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleOpenModal(row.id)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDeleteDidPool(row.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entityCount} // Updated to use new state variable
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default NewDidPool;

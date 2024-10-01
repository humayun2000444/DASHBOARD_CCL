import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import DidPoolModal from "./DidPoolModal";
import CommonCardHeader from "../../../components/core/commonCardHeader/CommonCardHeader";
import { Button } from "react-bootstrap";
import didPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";

// Common styles for the container
const commonContainerStyle = {
  backgroundColor: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(69, 69, 80, 0.1)",
  padding: "24px",
  borderRadius: "12px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  border: "1px solid #E6F5F8",
  height: "100%", // Ensures both components take up full height
};

const DIDPool = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editPool, setEditPool] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [tableBody, setTableBody] = useState([]);

  const tableHeaders = ["Pool Name", "Description", "Actions"];

  // Function to handle the API call and update the table
  const fetchDidPools = async () => {
    try {
      const data = await didPoolServices.getDidPools();
      // Assuming the API response contains an array of DID pools
      const formattedData = data.map((item) => ({
        poolName: item.name, // Use the correct key from API response
        description: item.description, // Use the correct key from API response
      }));
      setTableBody(formattedData); // Update the tableBody state with API data
    } catch (error) {
      console.error("Error fetching DID pools:", error);
    }
  };

  // Call the API when the component loads
  useEffect(() => {
    fetchDidPools();
  }, []); // Empty dependency array ensures it runs only once on mount

  const handlePoolClick = (poolName) => {
    history.push(`/AssignDid/${poolName}`);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleAddPool = () => {
    setEditPool(null); // Ensure it's a new pool
    toggleModal();
  };

  const handleEditPool = (pool) => {
    setEditPool(pool);
    toggleModal();
  };

  const handleSave = (newPool) => {
    if (editPool) {
      // Update existing pool
      setTableBody(
        tableBody.map((pool) =>
          pool.poolName === editPool.poolName ? newPool : pool
        )
      );
    } else {
      // Add new pool
      setTableBody([...tableBody, newPool]);
    }
    toggleModal(); // Close the modal after saving
  };

  return (
    <div>
      <div className="mt-3" style={commonContainerStyle}>
        <div>
          <CommonCardHeader
            title="Did Pool"
            subtitle="Check your DID pools here, view and manage details"
            buttonText="Add DID Pool"
            onButtonClick={handleAddPool}
          />

          <div className="mt-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  {tableHeaders.map((item, index) => (
                    <th key={index}>{item}</th>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody.map((item, index) => (
                  <TableRow key={index}>
                    <td>{item.poolName}</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="col-md-6 d-flex justify-content-end">
                        <Button onClick={() => handlePoolClick(item.poolName)}>
                          Manage Pool
                        </Button>{" "}
                        <Button
                          variant="danger"
                          className="ml-2"
                          onClick={() => handleEditPool(item)}
                        >
                          Edit
                        </Button>{" "}
                      </div>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DidPoolModal
        show={modalOpen}
        handleClose={toggleModal}
        poolData={editPool}
        onSave={handleSave}
      />
    </div>
  );
};

export default DIDPool;

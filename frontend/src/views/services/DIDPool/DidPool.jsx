// src/components/DIDPool.jsx
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import DidPoolModal from "./DidPoolModal";

const DIDPool = () => {
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const [editPool, setEditPool] = useState(null);

  const tableHeaders = ["Pool Name", "Description", "Actions"];

  const [tableBody, setTableBody] = useState([
    {
      poolName: "VIP",
      description: "Minimum 5 Digits",
    },
    {
      poolName: "Short Numbers",
      description: "Less than 5 digits",
    },
  ]);

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
      <Card className="mt-3">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="">DID Pool</h3>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddPool}
              sx={{
                backgroundColor: "#164677",
                "&:hover": {
                  backgroundColor: "#123a5a",
                },
              }}
            >
              Add DID Pool
            </Button>
          </div>

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
                    <td>
                      <span
                        style={{
                          color: "#164677",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => handlePoolClick(item.poolName)}
                      >
                        {item.poolName}
                      </span>
                    </td>
                    <td>{item.description}</td>
                    <td>
                      <div className="col-md-6 d-flex justify-content-end">
                        <Button
                          style={{
                            padding: "7px 12px",
                            borderColor: "#e42728",
                            backgroundColor: "#ea5455",
                            color: "#fff",
                          }}
                          onClick={() => handleEditPool(item)}
                        >
                          Manage Pool
                        </Button>
                      </div>
                    </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>

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

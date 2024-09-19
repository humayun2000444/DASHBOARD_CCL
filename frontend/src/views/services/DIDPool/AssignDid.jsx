import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import AssignNewDidModal from "./AssignNewDidModal"; // Import the new modal

const AssignDid = () => {
  const { poolName } = useParams(); // Get pool name from URL
  const [tableData, setTableData] = useState([
    { assignedDid: "09646699607", description: "Syed Easin" },
    { assignedDid: "09646699607", description: "Humayun Ahmed" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Save new DID to the table
  const handleSave = (newEntry) => {
    setTableData([...tableData, newEntry]);
  };

  useEffect(() => {
    // Example logic to fetch data specific to the pool name
    console.log(`Loading data for pool: ${poolName}`);
    // Fetch data here based on the poolName if necessary
  }, [poolName]);

  return (
    <div>
      <Card className="mt-3">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            {/* Heading with Pool Name */}
            <h3 className="">Assigned DID for {poolName} Pool</h3>

            {/* Buttons */}
            <div>
              <Button
                style={{
                  marginRight: "10px",
                  padding: "7px 12px",
                  backgroundColor: "#164677", // Blue background
                  color: "#fff",
                }}
                onClick={toggleModal}
              >
                Add New DID
              </Button>
              <Button
                style={{
                  padding: "7px 12px",
                  backgroundColor: "#EA5455", // Red background
                  color: "#fff",
                }}
              >
                Export CSV
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>Assigned DID Numbers</th>
                  <th>Description</th>
                  <th>Actions</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow key={index}>
                    <td>{item.assignedDid}</td>
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

      {/* Include the AssignNewDidModal */}
      <AssignNewDidModal
        show={isModalOpen}
        handleClose={toggleModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default AssignDid;

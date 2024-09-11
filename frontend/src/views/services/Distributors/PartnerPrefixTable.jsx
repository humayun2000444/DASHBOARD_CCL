import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const PartnerPrefixTable = ({ allPartnerPrefixes, handleDelete }) => {
  return (
    <TableContainer
      component={Paper}
      style={{ marginBottom: "1rem", maxHeight: "350px" }} // Adjust maxHeight as needed
    >
      <Table>
        <TableHead className="thead-uapp-bg">
          <TableRow style={{ textAlign: "center" }}>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Partner Name
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Priority
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              DID Number
            </TableCell>
            <TableCell style={{ color: "#fff", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allPartnerPrefixes.map((prefix, index) => (
            <TableRow key={index}>
              <TableCell>{prefix.partnerName}</TableCell>
              <TableCell>{prefix.priority}</TableCell>
              <TableCell>{prefix.DIDNo}</TableCell>
              <TableCell>
                <IconButton color="error" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PartnerPrefixTable;

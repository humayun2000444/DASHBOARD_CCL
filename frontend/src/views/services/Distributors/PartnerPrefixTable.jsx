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
      style={{ marginBottom: "1rem", maxHeight: "280px" }} // Adjust maxHeight as needed
    >
      <Table id="table-to-xls" className="table-sm table-bordered">
        <TableHead className="thead-uapp-bg">
          <TableRow>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Partner Name
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Priority
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              DID Number
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
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

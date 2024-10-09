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
              First Name
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Last Name
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              User Name
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Password
            </TableCell>
            <TableCell
              style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
            >
              Partner
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
              <TableCell>{prefix.firstName}</TableCell>
              <TableCell>{prefix.lastName}</TableCell>
              <TableCell>{prefix.userName}</TableCell>
              <TableCell>{prefix.password}</TableCell>
              <TableCell>{prefix.idPartner}</TableCell>
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

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardBody } from "reactstrap";
import DidPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";
import toast from "react-hot-toast";

const DidAllNumbers = () => {
  const [tableData, setTableData] = useState([]);
  const fetchDidNumbers = async () => {
    try {
      const response = await DidPoolServices.getDidNumbers();
      console.log(response);
      setTableData(response);
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
    }
  };

  useEffect(() => {
    fetchDidNumbers();
  }, []);

  return (
    <div>
      <Card className="mt-3">
        <CardBody>
          <div className="border-bottom mb-4">
            <h4 className="pb-3">Did Pool</h4>
          </div>

          <div className="mt-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>Name</th>
                  <th>Assigned DID Numbers</th>
                  <th>Description</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow key={index}>
                    <td>{item.didPool.name}</td>
                    <td>{item.id}</td>
                    <td>{item.description}</td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default DidAllNumbers;

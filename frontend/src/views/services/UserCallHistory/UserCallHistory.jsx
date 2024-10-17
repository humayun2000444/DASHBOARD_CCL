// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardBody } from "reactstrap";
// import partnerPrefixServices from "../../../apiServices/PartnerPrefixServices/PartnerPrefix";

// const UserCallHistory = () => {
//   const [partnerPrefix, setPartnerPrefix] = useState([]);

//   console.log(partnerPrefix);

//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const userName = localStorage.getItem("username");

//   const tableHeaders = [
//     "DID Number",
//     "Total Calls",
//     "Missed Calls",
//     "Incoming Calls",
//     "Outgoing Calls",
//   ];

//   const tableBody = [
//     {
//       didNumber: "09646699607",
//       totalCalls: "4500",
//       missedCalls: "320",
//       incomingCalls: "2458",
//       outgoingCalls: "1247",
//     },
//     {
//       didNumber: "09646699678",
//       totalCalls: "2500",
//       missedCalls: "320",
//       incomingCalls: "2458",
//       outgoingCalls: "1247",
//     },
//   ];

//   const fetchPartnerPrefix = async (id) => {
//     try {
//       const data = await partnerPrefixServices.fetchPartnerPrefixByEmail(
//         id,
//         userInfo.token
//       );
//       setPartnerPrefix(data);
//     } catch (error) {
//       console.error("Error fetching partner data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPartnerPrefix(userName);
//   }, []);

//   return (
//     <div>
//       <Card className="mt-3">
//         <CardBody>
//           <h3 className="">User Call History</h3>

//           <div className="mt-3">
//             <Table id="table-to-xls" className="table-sm table-bordered">
//               <TableHead className="thead-uapp-bg">
//                 <TableRow style={{ textAlign: "center" }}>
//                   {tableHeaders?.map((item, index) => (
//                     <th key={index}>{item}</th>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tableBody?.map((item, index) => (
//                   <TableRow key={index}>
//                     <td>
//                       {/* Pass tableHeaders and tableBody (individual item) via the 'state' prop */}
//                       <Link
//                         to={{
//                           pathname: `/userCDRSummery/${item.didNumber}`,
//                           state: { tableHeaders, item }, // Passing data here
//                         }}
//                       >
//                         {item?.didNumber}
//                       </Link>
//                     </td>
//                     <td>{item?.totalCalls}</td>
//                     <td>{item?.missedCalls}</td>
//                     <td>{item?.incomingCalls}</td>
//                     <td>{item?.outgoingCalls}</td>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default UserCallHistory;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import partnerPrefixServices from "../../../apiServices/PartnerPrefixServices/PartnerPrefix";

const UserCallHistory = () => {
  const [partnerPrefix, setPartnerPrefix] = useState([]);

  console.log(partnerPrefix);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userName = localStorage.getItem("username");

  const tableHeaders = [
    "DID Number",
    "Total Calls",
    "Missed Calls",
    "Incoming Calls",
    "Outgoing Calls",
  ];

  const tableBody = [
    {
      totalCalls: "4500",
      missedCalls: "320",
      incomingCalls: "2458",
      outgoingCalls: "1247",
    },
    {
      totalCalls: "2500",
      missedCalls: "320",
      incomingCalls: "2458",
      outgoingCalls: "1247",
    },
  ];

  const fetchPartnerPrefix = async (id) => {
    try {
      const data = await partnerPrefixServices.fetchPartnerPrefixByEmail(
        id,
        userInfo.token
      );
      console.log(data);
      setPartnerPrefix(data);
    } catch (error) {
      console.error("Error fetching partner data:", error);
      setPartnerPrefix([]);
    }
  };

  useEffect(() => {
    fetchPartnerPrefix(userName);
  }, []);

  return (
    <div>
      <Card
        style={{
          borderRadius: "0",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <CardBody>
          <div>
            {partnerPrefix.length > 0 ? (
              <Table id="table-to-xls" className="table-sm table-bordered">
                <TableHead className="thead-uapp-bg">
                  <TableRow style={{ textAlign: "center" }}>
                    {tableHeaders?.map((item, index) => (
                      <th key={index}>{item}</th>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {partnerPrefix?.map((prefixItem, index) => (
                    <TableRow key={index}>
                      <td>
                        {/* Pass tableHeaders and prefixItem (individual item) via the 'state' prop */}
                        <Link
                          to={{
                            pathname: `/userCDRSummery/${prefixItem.prefix}`,
                            state: { tableHeaders, prefixItem }, // Passing data here
                          }}
                        >
                          {prefixItem?.prefix}
                        </Link>
                      </td>
                      <td>{tableBody[index]?.totalCalls}</td>
                      <td>{tableBody[index]?.missedCalls}</td>
                      <td>{tableBody[index]?.incomingCalls}</td>
                      <td>{tableBody[index]?.outgoingCalls}</td>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <h4>No Data Available</h4>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCallHistory;

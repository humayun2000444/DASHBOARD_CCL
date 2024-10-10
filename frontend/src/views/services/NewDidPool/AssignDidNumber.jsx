// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import { useParams } from "react-router-dom";
// import { Card, CardBody } from "reactstrap";
// import { useLocation } from "react-router-dom";
// import DidPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";
// import AssigDidNumberModal from "./AssignDidNumberModal";
// import toast from "react-hot-toast";
// import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";

// const AssignDidNumber = () => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const { poolId } = useParams(); // Get pool name from URL
//   const location = useLocation();
//   const { poolName } = location.state || {};
//   const [tableData, setTableData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedAssignPoolId, setAssignPoolId] = useState(null);
//   const [partners, setPartners] = useState([]);
//   const [formData, setFormData] = useState({
//     didNumberId: "",
//     idPartner: "",
//     startDate: "",
//     expiryDate: "",
//     description: "",
//   });

//   // Toggle modal visibility
//   const handleOpenModal = (AssignPoolId = null) => {
//     setAssignPoolId(AssignPoolId);
//     setModalOpen(true);
//     if (AssignPoolId) {
//       fetchDidPoolData(AssignPoolId);
//     }
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setFormData({
//       didNumberId: "",
//       idPartner: "",
//       startDate: "",
//       expiryDate: "",
//       description: "",
//     });
//     setAssignPoolId(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       didNumberId: formData.didNumberId,
//       idPartner: formData.idPartner,
//       startDate: formData.startDate,
//       expiryDate: formData.expiryDate,
//       description: formData.description,
//       didPoolId: `${poolId}`,
//     };
//     console.log(data.didPoolId);
//     try {
//       if (selectedAssignPoolId) {
//         await DidPoolServices.updateDidAssignmentId(selectedAssignPoolId, data);
//         toast.success(
//           <span>
//             DID Number <strong>{formData.didNumberId}</strong> in the{" "}
//             <strong>{poolName}</strong> pool updated successfully!
//           </span>,
//           {
//             duration: 5000,
//             position: "top-center",
//           }
//         );
//       } else {
//         await DidPoolServices.createDidAssignment(data, userInfo.token);
//         toast.success(
//           <span>
//             DID Number <strong>{formData.didNumberId}</strong> in the{" "}
//             <strong>{poolName}</strong> pool created successfully!
//           </span>,
//           {
//             duration: 5000,
//             position: "top-center",
//           }
//         );
//       }
//       handleCloseModal();
//       fetchDidNumbers();
//     } catch (error) {
//       console.error("Error adding/updating permission:", error);
//       toast.error(
//         "Failed to save Did Number information. Please try again.",
//         `${error}`
//       );
//     }
//     console.log(data);
//   };

//   const fetchPartner = async () => {
//     try {
//       const data = await partnerServices.fetchPartners();
//       setPartners(data);
//     } catch (error) {
//       console.error("Error fetching authRoles:", error);
//     }
//   };

//   const fetchDidNumbers = async () => {
//     try {
//       const response = await DidPoolServices.getDidAssingnmentNumberById(
//         poolId
//       );
//       setTableData(response);
//     } catch (error) {
//       console.error("Error fetching DID numbers:", error);
//     }
//   };

//   const fetchDidPoolData = async (selectedAssignPoolId) => {
//     try {
//       console.log(selectedAssignPoolId);
//       const data = await DidPoolServices.updateDidAssignmentId(
//         selectedAssignPoolId,
//         userInfo.token
//       );
//       setFormData({
//         didNumberId: data.didNumberId,
//         idPartner: data.idPartner,
//         startDate: data.startDate,
//         expiryDate: data.expiryDate,
//         description: data.description,
//         didPoolId: data.poolId,
//       });
//     } catch (error) {
//       console.error("Error fetching partner data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDidNumbers();
//     fetchPartner();
//   }, [poolId]);

//   const handleDeleteDidPool = async (didId, didNumber, partnerName) => {
//     toast(
//       (t) => (
//         <div>
//           <h6>
//             Are you sure you want to delete the DID number{" "}
//             <strong>"{didNumber}"</strong>
//             assigned to <strong>"{partnerName}"</strong>?
//           </h6>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               marginTop: "10px",
//             }}
//           >
//             <Button onClick={() => toast.dismiss(t.id)}>Cancel</Button>
//             <Button
//               variant="danger"
//               onClick={async () => {
//                 try {
//                   toast.dismiss(t.id);
//                   const token = userInfo.token;
//                   if (!token) {
//                     throw new Error("No authentication token available");
//                   }
//                   await DidPoolServices.deleteDidAssignmentId(didId, token);
//                   fetchDidNumbers(); // Refresh DID numbers after deletion
//                   toast.success(
//                     <span>
//                       DID Number <strong>{didNumber}</strong> deleted
//                       successfully!
//                     </span>,
//                     {
//                       duration: 5000,
//                       position: "top-center",
//                     }
//                   );
//                 } catch (error) {
//                   console.error("Error deleting route:", error);
//                   toast.error("Failed to delete route!", `${error}`);
//                 }
//               }}
//             >
//               Confirm Delete
//             </Button>
//           </div>
//         </div>
//       ),
//       {
//         duration: Infinity,
//         position: "top-center",
//       }
//     );
//   };

//   return (
//     <div>
//       <AssigDidNumberModal
//         open={modalOpen}
//         handleClose={handleCloseModal}
//         handleSubmit={handleSubmit}
//         formData={formData}
//         handleChange={handleChange}
//         partners={partners}
//         title={selectedAssignPoolId ? "Update Route" : "Add Route"}
//         buttonText={selectedAssignPoolId ? "Update" : "Save"}
//       />
//       <Card className="mt-3">
//         <CardBody>
//           <div className="d-flex justify-content-between align-items-center">
//             <h3 className="">Assigned DID for {poolName} Pool</h3>
//             <div>
//               <Button
//                 style={{
//                   marginRight: "10px",
//                   padding: "7px 12px",
//                   backgroundColor: "#1D94AB",
//                   color: "#fff",
//                 }}
//                 onClick={handleOpenModal}
//               >
//                 Add New DID
//               </Button>
//               <Button
//                 style={{
//                   padding: "7px 12px",
//                   backgroundColor: "#EA5455",
//                   color: "#fff",
//                 }}
//               >
//                 Export CSV
//               </Button>
//             </div>
//           </div>

//           <div className="mt-3">
//             <Table id="table-to-xls" className="table-sm table-bordered">
//               <TableHead className="thead-uapp-bg">
//                 <TableRow style={{ textAlign: "center" }}>
//                   <th>DID Number</th>
//                   <th>Partner Name</th>
//                   <th>Start date</th>
//                   <th>End Data</th>
//                   <th>Description</th>
//                   <th>Actions</th>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tableData.map((item, index) => (
//                   <TableRow key={index}>
//                     <td>{item.didNumber}</td>
//                     <td>{item.partnerName}</td>
//                     <td>{item.startDate}</td>
//                     <td>{item.expiryDate}</td>
//                     <td>{item.description}</td>
//                     <td>
//                       <Button
//                         variant="info"
//                         onClick={() => handleOpenModal(item.id)}
//                       >
//                         Edit
//                       </Button>{" "}
//                       <Button
//                         variant="danger"
//                         onClick={() =>
//                           handleDeleteDidPool(
//                             item.id,
//                             item.didNumber,
//                             item.partnerName
//                           )
//                         }
//                       >
//                         Delete
//                       </Button>{" "}
//                     </td>
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

// export default AssignDidNumber;

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import DidPoolServices from "../../../apiServices/DIDPoolServices/DidPoolServices";
import partnerServices from "../../../apiServices/PartnerServices/PartnerServices";
import AssigDidNumberModal from "./AssignDidNumberModal";
import ImportCSVModal from "./ImportCSVModal";

const AssignDidNumber = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { poolId } = useParams();
  const location = useLocation();
  const { poolName } = location.state || {};
  const [tableData, setTableData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignPoolId, setAssignPoolId] = useState(null);
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    didNumberId: "",
    idPartner: "",
    startDate: "",
    expiryDate: "",
    description: "",
  });

  // Toggle modal visibility
  const handleOpenModal = (assignPoolId = null) => {
    setAssignPoolId(assignPoolId);
    setModalOpen(true);
    if (assignPoolId) {
      fetchDidPoolData(assignPoolId);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({
      didNumberId: "",
      idPartner: "",
      startDate: "",
      expiryDate: "",
      description: "",
    });
    setAssignPoolId(null);
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
      didNumberId: formData.didNumberId,
      idPartner: formData.idPartner,
      startDate: formData.startDate,
      expiryDate: formData.expiryDate,
      description: formData.description,
      didPoolId: `${poolId}`,
    };

    try {
      if (selectedAssignPoolId) {
        await DidPoolServices.updateDidAssignmentId(selectedAssignPoolId, data);
        toast.success(
          <span>
            DID Number <strong>{formData.didNumberId}</strong> in the{" "}
            <strong>{poolName}</strong> pool updated successfully!
          </span>,
          {
            duration: 5000,
            position: "top-center",
          }
        );
      } else {
        await DidPoolServices.createDidAssignment(data, userInfo.token);
        toast.success(
          <span>
            DID Number <strong>{formData.didNumberId}</strong> in the{" "}
            <strong>{poolName}</strong> pool created successfully!
          </span>,
          {
            duration: 5000,
            position: "top-center",
          }
        );
      }
      handleCloseModal();
      fetchDidNumbers();
    } catch (error) {
      toast.error("Failed to save DID number information. Please try again.");
    }
  };

  const fetchPartner = async () => {
    try {
      const data = await partnerServices.fetchPartners();
      setPartners(data);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  const fetchDidNumbers = async () => {
    try {
      const response = await DidPoolServices.getDidAssingnmentNumberById(
        poolId
      );
      setTableData(response);
    } catch (error) {
      console.error("Error fetching DID numbers:", error);
    }
  };

  const fetchDidPoolData = async (assignPoolId) => {
    try {
      const data = await DidPoolServices.DidAssignmentSingleData(
        assignPoolId,
        userInfo.token
      );
      setFormData({
        didNumberId: data.didNumberId,
        idPartner: data.idPartner,
        startDate: data.startDate,
        expiryDate: data.expiryDate,
        description: data.description,
      });
    } catch (error) {
      console.error("Error fetching DID data:", error);
    }
  };

  const handleDeleteDidPool = async (didId, didNumber, partnerName) => {
    toast(
      (t) => (
        <div>
          <h6>
            Are you sure you want to delete the DID number{" "}
            <strong>"{didNumber}"</strong>
            assigned to <strong>"{partnerName}"</strong>?
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
                  const token = userInfo.token;
                  if (!token) {
                    throw new Error("No authentication token available");
                  }
                  await DidPoolServices.deleteDidAssignmentId(didId, token);
                  fetchDidNumbers(); // Refresh DID numbers after deletion
                  toast.success(
                    <span>
                      DID Number <strong>{didNumber}</strong> deleted
                      successfully!
                    </span>,
                    {
                      duration: 5000,
                      position: "top-center",
                    }
                  );
                } catch (error) {
                  console.error("Error deleting route:", error);
                  toast.error("Failed to delete route!", `${error}`);
                }
              }}
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };
  useEffect(() => {
    fetchDidNumbers();
    fetchPartner();
  }, [poolId]);

  const [modalOpen2, setModalOpen2] = useState(false);
  const handleOpenModal2 = () => {
    setModalOpen2(true);
  };
  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  return (
    <div>
      <AssigDidNumberModal
        open={modalOpen}
        handleClose={handleCloseModal}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        partners={partners}
        title={selectedAssignPoolId ? "Update DID" : "Add DID"}
        buttonText={selectedAssignPoolId ? "Update" : "Save"}
      />

      <ImportCSVModal open={modalOpen2} setModalOpen={setModalOpen2} handleClose={handleCloseModal2} />

      <Card className="mt-3">
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="">Assigned DID for {poolName} Pool</h3>
            <div>
              <Button
                style={{
                  marginRight: "10px",
                  padding: "7px 12px",
                  backgroundColor: "#1D94AB",
                  color: "#fff",
                }}
                onClick={() => handleOpenModal(null)} // Open modal for adding a new DID
              >
                Add New DID
              </Button>
              <Button
                style={{
                  padding: "7px 12px",
                  backgroundColor: "#EA5455",
                  color: "#fff",
                }}
                onClick={handleOpenModal2}
              >
                Import CSV
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <TableHead className="thead-uapp-bg">
                <TableRow style={{ textAlign: "center" }}>
                  <th>DID Number</th>
                  <th>Partner Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Description</th>
                  <th>Actions</th>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow key={index}>
                    <td>{item.didNumber}</td>
                    <td>{item.partnerName}</td>
                    <td>{item.startDate}</td>
                    <td>{item.expiryDate}</td>
                    <td>{item.description}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleOpenModal(item.id)} // Open modal for editing
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDeleteDidPool(
                            item.id,
                            item.didNumber,
                            item.partnerName
                          )
                        }
                      >
                        Delete
                      </Button>{" "}
                    </td>
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

export default AssignDidNumber;

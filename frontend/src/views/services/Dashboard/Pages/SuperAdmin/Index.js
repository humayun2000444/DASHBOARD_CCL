import React from "react";
import AccountDetails from "../UserDashBoard/AccountDetails";
// import { Paper, Typography, IconButton, Box } from "@material-ui/core";
// import RefreshIcon from "@material-ui/icons/Refresh";
// import FullscreenIcon from "@material-ui/icons/Fullscreen";
// import { Card, CardBody, Table } from "reactstrap";

// import "../../../../../assets/scss/pages/dashboard-analytics.scss";

// import Chart from "react-apexcharts";
// import ReactApexChart from "react-apexcharts";
// import ReactECharts from "echarts-for-react";

// import { Link, useHistory } from "react-router-dom";
// import Select from "react-select";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
// import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// import { Col, Row } from "react-bootstrap";

// import axios from "axios";
// const SuperAdmin = () => {
//   const [open, setOpen] = useState(false);
//   const [options, setOptions] = useState({});
//   const [series, setSeries] = useState([40, 20, 20]);
//   const [Labels, setLabels] = useState([
//     "Total",
//     "In single Chats",
//     "In Group Chats",
//   ]);
//   const [count, setCount] = useState({});
//   const [applications, setApplications] = useState([]);
//   const [consultants, setConsultants] = useState([]);
//   const history = useHistory();

//   const orderName = [
//     { label: "Order", value: 1 },
//     { label: "Order 2", value: 2 },
//     { label: "Order 3", value: 3 },
//     // Add more orders as needed
//   ];
//   const [intake, setIntake] = useState({});

//   const [selectedOrder, setSelectedOrder] = useState({
//     label: "Select Country ",
//     value: "Country..",
//   });

//   const showDrawer = () => {
//     setOpen(true);
//   };
//   const onClose = () => {
//     setOpen(false);
//   };

//   const currentUser = JSON?.parse(localStorage.getItem("current_user"));

//   const handleDate = (e) => {
//     var datee = e;
//     var utcDate = new Date(datee);
//     var localeDate = utcDate.toLocaleString("en-CA");
//     const x = localeDate.split(",")[0];
//     return x;
//   };

//   const selectOrder = (label, value) => {
//     setSelectedOrder({ label, value });
//   };

//   const data = [
//     { time: "12:15:00", Success: 10, Failed: 9 },
//     { time: "12:30:00", Success: 10, Failed: 2 },
//     { time: "12:45:00", Success: 5, Failed: 15 },
//     { time: "13:00:00", Success: 0, Failed: 0 },
//     { time: "13:15:00", Success: 1, Failed: 0 },
//     { time: "13:30:00", Success: 0, Failed: 0 },
//     { time: "13:45:00", Success: 8, Failed: 0 },
//     { time: "14:00:00", Success: 0, Failed: 0 },
//     { time: "14:15:00", Success: 0, Failed: 0 },
//     { time: "14:30:00", Success: 0, Failed: 0 },
//   ];
//   const option = {
//     title: {
//       text: "Calls",
//     },
//     tooltip: {
//       trigger: "axis",
//     },
//     legend: {
//       data: ["Failed", "Success"],
//       right: 10,
//     },
//     grid: {
//       left: "3%",
//       right: "4%",
//       bottom: "3%",
//       containLabel: true,
//     },
//     xAxis: {
//       type: "category",
//       boundaryGap: false,
//       data: [
//         "12:15:00",
//         "12:30:00",
//         "12:45:00",
//         "13:00:00",
//         "13:15:00",
//         "13:30:00",
//         "13:45:00",
//         "14:00:00",
//         "14:15:00",
//         "14:30:00",
//       ],
//     },
//     yAxis: {
//       type: "value",
//       min: -1,
//     },
//     series: [
//       {
//         name: "Failed",
//         type: "line",
//         stack: "Total",
//         data: [9, 7, 15, 0, 0, 9, 4, 1, 2, 9],
//         itemStyle: {
//           color: "red",
//         },
//       },
//       {
//         name: "Success",
//         type: "line",
//         stack: "Total",
//         data: [10, 12, 5, 22, 1, 4, 6, 3, 19, 7],
//         itemStyle: {
//           color: "green",
//         },
//       },
//     ],
//   };

//   // Statistics
//   const chartData = {
//     series: [
//       {
//         data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 123, 89, 60, 30, 20, 10, 5],
//       },
//     ],
//     options: {
//       chart: {
//         type: "area",
//         sparkline: {
//           enabled: true,
//         },
//       },
//       stroke: {
//         curve: "smooth",
//       },
//       fill: {
//         opacity: 1,
//       },
//       tooltip: {
//         enabled: false,
//       },
//       xaxis: {
//         type: "datetime",
//         categories: Array.from(
//           { length: 16 },
//           (_, i) => `2023-07-01T${i}:00:00`
//         ),
//       },
//     },
//   };

//   const [systemInfo, setSystemInfo] = useState({
//     disk: undefined,
//   });
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           "http://iptsp.cosmocom.net:4000/systeminfo"
//         );
//         setSystemInfo(response.data);
//       } catch (error) {
//         console.error("Error fetching system information:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const metrics = [
//     { title: "CPU usage", value: systemInfo.cpu?.usage || "Loading..." },
//     { title: "Memory usage", value: systemInfo.memory?.usage || "Loading..." },
//     { title: "Disk usage", value: systemInfo.disk?.usage || "Loading..." },
//     { title: "Registered users", value: "0", extraIcons: true },
//     { title: "Answer Seizure Ratio (ASR)", value: "0%" },
//     { title: "Average Call Duration (ACD)", value: "00:00:18.5" },
//   ];

//   // const handleClick = () => {
//   //   // Open a new browser window with specific dimensions and features
//   //   window.open(
//   //     "https://www.google.com", // URL to open
//   //     "_blank", // Open in a new window or tab
//   //     "noopener,noreferrer,width=800,height=600,left=200,top=100" // Features like size and position
//   //   );
//   // };

//   const handleClick = () => {
//     // Assuming your app is running on localhost:3000 or another base URL
//     const baseUrl = window.location.origin; // e.g., http://localhost:3000
//     const path = "/CDRs"; // The path you want to open

//     // Open a new browser window with the specific route
//     window.open(
//       `${baseUrl}${path}`,
//       "_blank",
//       "noopener,noreferrer,width=800,height=600,left=200,top=100"
//     );
//   };

//   return (
//     <React.Fragment>
//       <div className="d-flex justify-content-between flex-wrap">
//         <div>
//           <span className="std-dashboard-style1">
//             {/* Hello, {currentUser?.displayName}! */}
//           </span>
//         </div>
//       </div>

//       {/* Status */}

//       <Card>
//         <CardBody>
//           <h2 className="mb-4">Real time statistic</h2>
//           <button onClick={handleClick}>Open New Window</button>
//           <div className="row">
//             <div className="col-md-3 mb-3">
//               <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
//                 <div className="count-card-title">Total Users</div>
//                 <div
//                   className="count-card-value"
//                   onClick={() => {
//                     history.push(`/applications`);
//                   }}
//                   style={{ cursor: "pointer" }}
//                 >
//                   {count?.totalApplication}
//                 </div>
//               </div>
//             </div>

//             <div className="col-md-3 mb-3">
//               <div className="count-card count-primary counter-h-112 bg-gray shadow border-0">
//                 <span className="pvdadmin-span-style1">Online Users</span>

//                 <span
//                   className="pvdadmin-span-style2"
//                   style={{ cursor: "pointer" }}
//                   onClick={() => {
//                     history.push(`/applicationsByStatus/${2}/${1}`);
//                   }}
//                 >
//                   {count?.totalApplicationInProgress}
//                 </span>
//               </div>
//             </div>

//             <div className="col-md-3 mb-3">
//               <div
//                 className="count-card counter-h-112 bg-gray shadow border-0"
//                 style={{ border: "0.5px solid #AE75F8" }}
//               >
//                 <span className="pvdadmin-span-style1">Lives Call</span>

//                 <span
//                   className="pvdadmin-span-style2"
//                   style={{ color: "#AE75F8", cursor: "pointer" }}
//                   onClick={() => {
//                     history.push(`/applicationsByStatus/${2}/${2}`);
//                   }}
//                 >
//                   {count?.totalUnconditionalOffer}
//                 </span>
//               </div>
//             </div>

//             <div className="col-md-3 mb-3">
//               <div
//                 className="count-card counter-h-112 bg-gray shadow border-0"
//                 style={{ border: "0.5px solid #F7BD12 " }}
//               >
//                 <span className="pvdadmin-span-style1">
//                   Live Out / In Calls
//                 </span>

//                 <span
//                   className="pvdadmin-span-style2"
//                   style={{ color: "#F7BD12", cursor: "pointer" }}
//                   onClick={() => {
//                     history.push(`/applicationsByStatus/${2}/${3}`);
//                   }}
//                 >
//                   {count?.totalRegistered}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </CardBody>
//       </Card>
//       <div>
//         <Card>
//           <CardBody>
//             <Row>
//               {metrics.map((metric, index) => (
//                 <Col md={4} key={index} style={{ marginBottom: "20px" }}>
//                   <Paper style={{ padding: "20px", position: "relative" }}>
//                     <Box
//                       display="flex"
//                       justifyContent="space-between"
//                       alignItems="center"
//                     >
//                       <Typography variant="h6">{metric.title}</Typography>
//                       {metric.extraIcons && (
//                         <Box>
//                           <IconButton size="small">
//                             <FullscreenIcon fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small">
//                             <RefreshIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       )}
//                     </Box>
//                     <Typography variant="h3" style={{ margin: "10px 0" }}>
//                       {metric.value}
//                     </Typography>
//                     <ReactApexChart
//                       options={chartData.options}
//                       series={chartData.series}
//                       type="area"
//                       height={80}
//                     />
//                   </Paper>
//                 </Col>
//               ))}
//             </Row>
//             <ReactECharts
//               option={option}
//               style={{ height: 400, width: "100%" }}
//             />
//           </CardBody>
//         </Card>
//       </div>

//       <section>
//         <Card>
//           <CardBody>
//             <p style={{ textAlign: "center", fontWeight: "700" }}>Total</p>
//           </CardBody>
//         </Card>
//       </section>
//       {/* message section */}
//       <section className="row">
//         <div className="col-md-6">
//           <Card>
//             <CardBody>
//               {/* Message */}
//               <div className="border-bottom">
//                 <h4>Message</h4>
//               </div>
//               <div className="mt-4">
//                 <Select
//                   className="mr-md-2 mr-sm-0"
//                   options={orderName}
//                   value={{
//                     label: selectedOrder.label,
//                     value: selectedOrder.value,
//                   }}
//                   onChange={(opt) => selectOrder(opt.label, opt.value)}
//                 />
//               </div>
//               <table class="table mt-5">
//                 <thead class="thead-light">
//                   <tr>
//                     <th scope="col"></th>
//                     <th scope="col">COUNTRY</th>
//                     <th scope="col">MESSAGE - COUNT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Bangladesh</td>
//                     <td>2169</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </CardBody>
//           </Card>
//         </div>
//         <div className="col-md-6">
//           <Card>
//             <CardBody>
//               {/* Message by types */}
//               <div className="border-bottom">
//                 <h4>Message by Types</h4>
//               </div>
//               <Card>
//                 <CardBody>
//                   <div className="row my-4">
//                     <div className="col-md-3">
//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div1"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             Total
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             40
//                           </span>
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div2"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             In Single Chats{" "}
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             20
//                           </span>
//                         </div>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div4"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             In Group Chats
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             20
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-5">
//                       <Chart
//                         options={options}
//                         series={series}
//                         type="donut"
//                         width="100%"
//                         height="100%"
//                       />
//                     </div>
//                     <div className="col-md-4"></div>
//                   </div>
//                 </CardBody>
//               </Card>
//             </CardBody>
//           </Card>
//         </div>
//       </section>
//       {/* call section */}
//       <section className="row">
//         <div className="col-md-6">
//           <Card>
//             <CardBody>
//               {/* Message */}
//               <div className="border-bottom">
//                 <h4>Calls</h4>
//               </div>
//               <div className="mt-4">
//                 <Select
//                   className="mr-md-2 mr-sm-0"
//                   options={orderName}
//                   value={{
//                     label: selectedOrder.label,
//                     value: selectedOrder.value,
//                   }}
//                   onChange={(opt) => selectOrder(opt.label, opt.value)}
//                 />
//               </div>
//               <table class="table mt-5">
//                 <thead class="thead-light">
//                   <tr>
//                     <th scope="col"></th>
//                     <th scope="col">COUNTRY</th>
//                     <th scope="col">Internal Call - COUNT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">1</th>
//                     <td>Bangladesh</td>
//                     <td>2169</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </CardBody>
//           </Card>
//         </div>
//         <div className="col-md-6">
//           <Card>
//             <CardBody>
//               {/* call by types */}
//               <div className="border-bottom">
//                 <h4>Calls by Types</h4>
//               </div>
//               <div className="row mt-3" style={{ fontSize: "18px" }}>
//                 <div className="col-md-4  border-right">
//                   <div className="d-flex justify-content-around">
//                     {" "}
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>Internal calls</p>
//                     </div>
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>Duration (min)</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4 border-right">
//                   <div className="d-flex justify-content-around">
//                     {" "}
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>Out calls</p>
//                     </div>
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>Duration (min)</p>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-4">
//                   <div className="d-flex justify-content-around">
//                     {" "}
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>In calls</p>
//                     </div>
//                     <div>
//                       <p className="mb-1">0.0</p>
//                       <p>Duration (min)</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* <Card>
//                 <CardBody>
//                   <div className="row my-4">
//                     <div className="col-md-3">
//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div1"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             Total
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             40
//                           </span>
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div2"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             In Single Chats{" "}
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             20
//                           </span>
//                         </div>
//                       </div>
//                       <div className="d-flex justify-content-between">
//                         <div className="d-flex">
//                           <div className="custom-conslt-div4"></div>
//                           <p
//                             style={{
//                               fontWeight: "500",
//                               position: "relative",
//                               top: "4px",
//                             }}
//                           >
//                             In Group Chats
//                           </p>
//                         </div>

//                         <div>
//                           <span style={{ position: "relative", top: "4px" }}>
//                             20
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-5">
//                       <Chart
//                         options={options}
//                         series={series}
//                         type="donut"
//                         width="100%"
//                         height="100%"
//                       />
//                     </div>
//                     <div className="col-md-4"></div>
//                   </div>
//                 </CardBody>
//               </Card> */}
//             </CardBody>
//           </Card>
//         </div>
//       </section>
//       <section>
//         <Card>
//           <CardBody>
//             <div className="border-bottom d-flex justify-content-between">
//               <h4>Monthly Active Users</h4>
//               <button type="button" className="btn btn-light mb-1">
//                 <FontAwesomeIcon icon={faArrowRotateRight} />
//                 Refresh
//               </button>
//             </div>
//           </CardBody>
//         </Card>
//       </section>
//       <div>
//         <Card>
//           <CardBody>
//             <span className="app-style-const">Consultant Transaction List</span>

//             {consultants?.length > 0 ? (
//               <div style={{ height: "300px", overflowY: "scroll" }}>
//                 <Table borderless responsive className="mt-3">
//                   <thead style={{ backgroundColor: "#EEF3F4" }}>
//                     <tr>
//                       <th>Consultant ID</th>
//                       <th>Consultant Name</th>
//                       <th>Total In Flow</th>
//                       <th>Total Out Flow</th>
//                       <th>Total Balance</th>
//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {consultants?.map((con, i) => (
//                       <tr key={i}>
//                         <td className="cursor-pointer hyperlink-hover">
//                           <span
//                             onClick={() => {
//                               history.push(
//                                 `accountTransactionByConsultant/${con?.consultantId}`
//                               );
//                             }}
//                           >
//                             {con?.consultantViewId}
//                           </span>
//                         </td>
//                         <td>{con?.consultantName}</td>
//                         <td>{con?.credit}</td>
//                         <td>{con?.debit}</td>
//                         <td>{con?.balance}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </div>
//             ) : (
//               <p style={{ textAlign: "center", fontWeight: "700" }}>
//                 No Transaction
//               </p>
//             )}
//           </CardBody>
//         </Card>
//       </div>

//       {/* consultant transaction list table end */}
//     </React.Fragment>
//   );
// };

// export default SuperAdmin;
import CallSummaryChart from "../UserDashBoard/CallSummaryChart";
import DashboardBalance from "../UserDashBoard/DashboardBalance";
import DashboardCallStatus from "../UserDashBoard/DashboardCallStatus";
import DashboardCdrTable from "../UserDashBoard/DashboardCdrTable";
import LiveCalls from "../UserDashBoard/LiveCalls";
import PBXOverview from "../UserDashBoard/PBXOverview";

const SuperAdmin = () => {
  return (
    <div>
      <div
        className="dashboardWrapper"
        style={{
          width: "100%",
          display: "flex",
          position: "absolute",
          top: "-8px",
          right: "0px",
        }}
      >
        <div
          className="dashboardLeftWrapper"
          style={{
            width: "24%",
            height: "100vh",
            background: "#f8f8f8",
            padding: "32px 28px",
          }}
        >
          <AccountDetails />
          <DashboardBalance />
          <LiveCalls />
        </div>
        <div
          className="dashboardRightWrapper"
          style={{
            width: "76%",
            background: "#fff",
            padding: "32px 28px",
          }}
        >
          <DashboardCallStatus />
          <PBXOverview />
          <CallSummaryChart />
          <DashboardCdrTable />
        </div>
      </div>
    </div>
  );
};

export default SuperAdmin;

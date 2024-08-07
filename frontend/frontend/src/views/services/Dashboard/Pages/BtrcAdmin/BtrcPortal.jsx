import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
// import "../../../assets/scss/pages/analytics-dashboard.scss";
import "../../../../../assets/scss/pages/analytics-dashboard.scss";
import getCclIpTraffic from "../../../../../apiServices/CCLDataServices/getCclIpTraffic";
import getCclTdmTraffic from "../../../../../apiServices/CCLDataServices/getCclTdmTraffic";
import AnalyticsTable from "./AnlyticsTable";
import UsageData from "./UsageData";

const BtrcPortal = () => {
  const [cclIpData, setCclIpData] = useState([
    {
      partnerName: "Agni",
      callType: 1,
      maxCapacity: 25,
      concurrentCall: 0,
    },
    {
      partnerName: "Agni",
      callType: 2,
      maxCapacity: 5,
      concurrentCall: 0,
    },
    {
      partnerName: "Summit communication limited",
      callType: 1,
      maxCapacity: 25,
      concurrentCall: 0,
    },
    {
      partnerName: "Summit communication limited",
      callType: 2,
      maxCapacity: 5,
      concurrentCall: 0,
    },
  ]);

  const [cclTdmData, setCclTdmData] = useState([
    {
      partnerName: "BTCL",
      callType: 1,
      maxCapacity: 30,
      concurrentCall: 0,
    },
  ]);
  const [totalUsage, setTotalUsage] = useState(0);

  // Fetch CCL IP Traffic data
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCclIpTraffic.fetchCCLIpData();
        const updatedCclIpData = cclIpData.map((item) => {
          const matchingResult = result.find(
            (r) =>
              r.partnerName === item.partnerName && r.callType === item.callType
          );
          if (matchingResult) {
            return {
              ...item,
              concurrentCall:
                item.concurrentCall + matchingResult.concurrentCall,
            };
          }
          return item;
        });
        setCclIpData(updatedCclIpData);
      } catch (err) {
        console.log("Error Fetching Data: " + err);
      }
    };

    // Initial load
    loadData();

    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(loadData, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch CCL IP Data Outgoing
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCclIpTraffic.fetchCCLIpDataOutgoing();
        const updatedCclIpData = cclIpData.map((item) => {
          const matchingResult = result.find(
            (r) =>
              r.partnerName === item.partnerName && r.callType === item.callType
          );
          if (matchingResult) {
            return {
              ...item,
              concurrentCall:
                item.concurrentCall + matchingResult.concurrentCall,
            };
          }
          return item;
        });
        setCclIpData(updatedCclIpData);
      } catch (err) {
        console.log("Error Fetching Data: " + err);
      }
    };

    // Initial load
    loadData();

    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(loadData, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch CCL TDM Traffic data
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await getCclTdmTraffic.fetchCCLTdmData();
        const updatedCclTdmData = cclTdmData.map((item) => {
          const matchingResult = result.find(
            (r) => r.partnerName === item.partnerName
          );
          if (matchingResult) {
            return {
              ...item,
              concurrentCall:
                item.concurrentCall + matchingResult.concurrentCall,
            };
          }
          return item;
        });
        setCclTdmData(updatedCclTdmData);
      } catch (err) {
        console.log("Error Fetching Data: " + err);
      }
    };

    // Initial load
    loadData();

    // Set interval to fetch data every 5 seconds
    const intervalId = setInterval(loadData, 5000);

    // Cleanup function to clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Calculate total usage
  useEffect(() => {
    const allCclData = [...cclIpData, ...cclTdmData];
    let total = 0;
    allCclData.forEach((item) => {
      total += (item.maxCapacity * item.concurrentCall) / 100;
    });
    setTotalUsage(total);
  }, [cclIpData, cclTdmData]);

  return (
    <>
      <Card className="analyticsDashboard">
        <Card.Body>
          <Card.Title>
            <h4
              style={{ textTransform: "capitalize" }}
              className="border-bottom"
            >
              Welcome to CCL Telephony Service
            </h4>
          </Card.Title>
          <div className="analyticsTables">
            <h5>Channel Utilization Dashboard</h5>
            {/* First Table */}
            <div className="singleTable">
              <h6>CCL IP Traffic</h6>
              <AnalyticsTable
                cclData={cclIpData}
                tableType={"cclIp"}
                totalUsage={totalUsage}
              />
            </div>
            {/* Second Table */}
            <div className="singleTable">
              <h6>CCL TDM Traffic</h6>
              <AnalyticsTable
                cclData={cclTdmData}
                tableType={"cclTdm"}
                totalUsage={totalUsage}
              />
            </div>
            {/* Grand Total */}
            <div className="singleTable">
              <AnalyticsTable
                cclData={[...cclIpData, ...cclTdmData]}
                tableType={"grandTotal"}
                totalUsage={totalUsage}
              />
            </div>
          </div>
          <div className="usageData">
            <UsageData color={"#1679AB"} text={"Usage less than 70%"} />
            <UsageData color={"#F4CE14"} text={"Usage between 70% - 80%"} />
            <UsageData color={"#FF6500"} text={"Usage between 80% - 90%"} />
            <UsageData color={"#B80000"} text={"Usage greater than 90%"} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default BtrcPortal;

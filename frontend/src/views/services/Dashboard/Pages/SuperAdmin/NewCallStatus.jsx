import React, { useState, useEffect } from 'react';
import CommonCardHeader from "../../../../../components/core/commonCardHeader/CommonCardHeader";
import { Doughnut } from "react-chartjs-2";
import { useHistory } from "react-router-dom";
import DashboardServices from "../../../../../apiServices/Dashboard/DashboardServices";

const useStyles = {
  chartContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartSection: {
    width: "50%",
    textAlign: "center",
    maxWidth: "300px",
  },
  detailsList: {
    width: "45%",
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0",
    borderBottom: "1px dashed #E0E0E0",
  },
  rightLabel: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "600",
    color: "#333",
  },
  rightCallCount: {
    fontFamily: "Inter",
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  coloredCircle: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    marginRight: "8px",
  },
};

const NewCallStatus = ({ selectedFilter = "Last 1 hour" }) => {
  const history = useHistory();
  const [callData, setCallData] = useState({
    total: 0,
    outgoing: 0,
    incoming: 0,
    missed: 0,
  });
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchCallData = async () => {
      try {
        const { startStamp, endStamp } = getTimestamps(selectedFilter);
        console.log('Fetching data from:', startStamp, 'to:', endStamp); // Debugging line

        const [totalCalls, outgoingCalls, incomingCalls, missedCalls] = await Promise.all([
          DashboardServices.getTotalCallsForAdmin(startStamp, endStamp),
          DashboardServices.getOutgoingCallsForAdmin(startStamp, endStamp),
          DashboardServices.getIncomingCallsForAdmin(startStamp, endStamp),
          DashboardServices.getMissedCallsForAdmin(startStamp, endStamp),
        ]);

        setCallData({
          total: totalCalls || 0,
          outgoing: outgoingCalls || 0,
          incoming: incomingCalls || 0,
          missed: missedCalls || 0,
        });
      } catch (error) {
        console.error("Error fetching call data: ", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCallData();
  }, [selectedFilter]); // Re-fetch when selectedFilter changes

  const getTimestamps = (filter) => {
    const endStamp = new Date();
    let startStamp = new Date();

    switch (filter) {
      case 'Last 1 hour':
        startStamp.setHours(endStamp.getHours() - 1);
        break;
      case 'Last 24 hours':
        startStamp.setHours(endStamp.getHours() - 24);
        break;
      case 'Last 7 days':
        startStamp.setDate(endStamp.getDate() - 7);
        break;
      case 'Last 30 days':
        startStamp.setDate(endStamp.getDate() - 30);
        break;
      default:
        startStamp = endStamp; // Prevent errors if filter is unknown
        break;
    }

    return {
      startStamp: startStamp.toISOString(),
      endStamp: endStamp.toISOString(),
    };
  };

  const handleButtonClick = () => {
    history.push("/userCallHistory");
  };

  const chartData = {
    labels: [],
    datasets: [
      {
        data: callData.total === 0 ? [1] : [callData.total, callData.incoming, callData.outgoing, callData.missed],
        backgroundColor: callData.total === 0 ? ['#E0E0E0'] : ['#1d94ab', '#4CAF50', '#2196F3', '#F44336'],
      },
    ],
  };

  const isDataEmpty = Object.values(callData).every(value => value === 0);

  return (
    <div>
      <CommonCardHeader
        title="Call Status"
        subtitle={`Data from ${selectedFilter}`}
        buttonText="View Report"
        onButtonClick={handleButtonClick}
      />

      <div style={useStyles.chartContainer}>
        <div style={{ ...useStyles.chartSection, position: 'relative' }}>
          {loading ? ( // Conditional rendering for loading state
            <div>Loading...</div>
          ) : (
            <>
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '90%',
                  plugins: {
                    tooltip: { enabled: !isDataEmpty },
                  },
                }}
                height={230}
                width={230}
              />
              <h3 style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1d94ab',
                textAlign: 'center',
              }}>
                {isDataEmpty ? "0" : callData.total}
                <span style={{ display: 'block', fontSize: '14px', fontWeight: 400, color: '#888888' }}>Total Calls</span>
              </h3>
            </>
          )}
        </div>

        <div style={useStyles.detailsList}>
          {loading ? ( // Show loading state for details as well
            <div>Loading details...</div>
          ) : (
            [
              { label: "Total Calls", value: callData.total, color: "#1d94ab" },
              { label: "Incoming Calls", value: callData.incoming, color: "#4CAF50" },
              { label: "Outgoing Calls", value: callData.outgoing, color: "#2196F3" },
              { label: "Missed Calls", value: callData.missed, color: "#F44336" },
            ].map((item, index) => (
              <div key={index} style={{ ...useStyles.detailItem, borderBottom: index < 3 ? '1px dashed #E0E0E0' : 'none' }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ ...useStyles.coloredCircle, backgroundColor: item.color }} />
                  <span style={useStyles.rightLabel}>{item.label}:</span>
                </div>
                <span style={useStyles.rightCallCount}>{item.value === 0 ? "0" : item.value}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewCallStatus;

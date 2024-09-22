import React, { useEffect, useState } from "react";
import adminDashboardServices from "../../../../../apiServices/AdminDashboardServices/adminDashboardServices";

const AccountDetails = () => {
  const username = localStorage.getItem("username");
  const token = JSON.parse(localStorage.getItem("userInfo")).token;

  const [partnerDetails, setPartnerDetails] = useState(null);

  const fetchPartnerDetails = async () => {
    try {
      const data = await adminDashboardServices.fetchPartnerDetailsUser(token, {
        email: username,
      });
      setPartnerDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPartnerDetails();
  }, []);

  console.log();
  console.log(partnerDetails?.partner.customerPrePaid);
  return (
    <div>
      <div>
        <div className="dashboardBalanceWrapper">
          <div>
            <div
              style={{
                backgroundColor: "#fff",
                boxShadow: "1",
                borderRadius: "8px",
                padding: "20px",
                minWidth: "300px",
              }}
            >
              <div
                style={{
                  color: "#333",
                  fontSize: "18px",
                  fontWeight: 500,
                  paddingBottom: "8px",
                  borderBottom: "1px solid #EBEBEB",
                }}
              >
                Account Details
              </div>
              <div
                style={{
                  color: "#2D3748",
                  fontSize: "28px",
                  fontWeight: "bold",
                  padding: "12px 0 6px 0",
                }}
              >
                {partnerDetails?.partner.partnerName}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative", // Ensure that absolute positioning inside the container is relative to this div
                  width: "100%", // Set to the size of the CircularProgress
                  height: "100%", // Set to the size of the CircularProgress
                }}
              ></div>

              <div
                style={{
                  color: "#525256",
                  fontSize: "14px",
                }}
              >
                <span>Account Type </span>
                <span
                  style={{
                    color: "#064E3B",
                    fontSize: "14px",
                    padding: "4px 8px",
                    marginRight: "6px",
                    borderRadius: "4px",
                    backgroundColor: "#D1FAE5",
                  }}
                >
                  {partnerDetails?.partner.customerPrePaid === 2
                    ? "Prepaid"
                    : "Postpaid"}
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;

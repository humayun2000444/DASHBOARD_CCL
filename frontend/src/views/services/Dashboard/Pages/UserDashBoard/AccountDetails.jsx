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
                  fontFamily:"Inter",
                  fontSize: "16px",
                  fontWeight: 500,
                  letterSpacing:"-0.4px",
                  paddingBottom: "8px",
                  borderBottom: "1px solid #EBEBEB",
                }}
              >
                Account details
              </div>
              <div
                style={{
                  color: "#2D3748",
                  fontFamily: "Inter",
                  fontSize: "24px",
                  letterSpacing:"-0.8px",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  padding: "12px 0 6px 0",
                }}
              >
                {partnerDetails?.partner.partnerName}
              </div>

              <div
                style={{
                  color: "#525256",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  letterSpacing:"-0.4px",
                }}
              >
                <span>Account Type </span>
                <span
                  style={{
                    color: "#064E3B",
                    fontFamily: "Inter",
                    fontSize: "14px",
                    letterSpacing:"-0.4px",
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

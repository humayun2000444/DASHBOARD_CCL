import CallIcon from "@mui/icons-material/Call";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const styles = {
  cardWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 16,
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    boxShadow: "0 8px 24px rgba(69,69,80,0.1)",
    width: "25%",
    padding: "18px 22px",
    borderRadius: "12px",
  },
  cardContext: {
    color: "#656575",
    fontSize: "14px",
  },
  cardValue: {
    color: "#2D3748",
    fontSize: "24px",
    fontWeight: "bold",
  },
  iconWrapper: {
    backgroundColor: "#EFF2F1",
    padding: "12px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: "#006AFF",
  },
};

const CallStatusCard = ({ label, value, Icon }) => {
  return (
    <div style={styles.card}>
      <div className="cardContext">
        <span style={styles.cardContext}>{label}</span>
        <br />
        <span style={styles.cardValue}>{value}</span>
      </div>
      <div style={styles.iconWrapper}>
        <Icon style={styles.icon} />
      </div>
    </div>
  );
};

const DashboardCallStatus = () => {
  const callStatuses = [
    { label: "Total calls", value: 312302, Icon: CallIcon },
    { label: "Outgoing calls", value: 39874, Icon: CallMadeIcon },
    { label: "Incoming calls", value: 55874, Icon: CallReceivedIcon },
    { label: "Missed calls", value: 4572, Icon: CallMissedIcon },
  ];

  return (
    <div style={styles.cardWrapper}>
      {callStatuses.map((status, index) => (
        <CallStatusCard
          key={index}
          label={status.label}
          value={status.value}
          Icon={status.Icon}
        />
      ))}
    </div>
  );
};

export default DashboardCallStatus;
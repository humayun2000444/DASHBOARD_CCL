import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MicIcon from '@mui/icons-material/Mic';

const OngoingCallToast = ({ callerName, toastId }) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isToastVisible) return;

    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isToastVisible]);

  const handleEndCall = () => {
    console.log('Call Ended - Toast ID:', toastId);
    setIsToastVisible(false);
    toast.dismiss(toastId);
  };

  const handleMute = () => {
    console.log('Muted - Toast ID:', toastId);
    setIsMuted((prev) => !prev); // Toggle mute state
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  if (!isToastVisible) return null; // Return null if the toast is not visible

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <AccountCircleIcon
          style={{
            width: '50px',
            height: '50px',
            color: '#4CAF50',
            marginRight: '10px',
          }}
        />
        <div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{callerName}</p>
          <p style={{ margin: 0, color: '#666' }}>{formatDuration(callDuration)}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button
          style={{
            backgroundColor: '#ff4b4b',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={handleEndCall} // End the call
        >
          <PhoneDisabledIcon />
        </button>
        <button
          style={{
            backgroundColor: isMuted ? '#8e8e8e' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={handleMute} // Toggle mute
        >
          <MicIcon />
        </button>
      </div>
    </div>
  );
};

export default OngoingCallToast;



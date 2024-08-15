import React from 'react';
import { toast } from 'react-hot-toast';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import Calls from './Calls';

const IncomingCallToast = ({ phoneNumber, onAccept }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: '#f0f0f0',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AccountCircleIcon
        style={{
          width: '50px',
          height: '50px',
          color: '#4CAF50',
          marginRight: '10px',
        }}
      />
      <div>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{phoneNumber}</p>
        <p style={{ margin: 0, color: '#666' }}>Incoming call</p>
      </div>
    </div>
    <div style={{display: 'flex', gap: '10px'}}>
      <button
        style={{
          backgroundColor: '#ff4b4b',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={() => toast.dismiss()}
      >
        <PhoneDisabledIcon/>
      </button>
      <button
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onClick={onAccept}
      >
        <PhoneIcon/>
      </button>
    </div>
  </div>
);

export default IncomingCallToast;



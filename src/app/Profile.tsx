// Profile.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';

const Profile = () => {
  const account = useAccount();

  return (
    <div style={styles.profileContainer}>
      <ConnectButton />
    </div>
  );
};

// Styles for the Profile component
const styles = {
  profileContainer: {
    // position: 'absolute',
    // top: '10px',
    // left: '20px',
    justifyContent: 'left',
    display: 'flex',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    // margin: '20px auto',
  },
  title: {
    marginBottom: '15px',
    color: '#333',
    textAlign: 'center',
  },
  accountInfo: {
    marginBottom: '15px',
  },
  infoItem: {
    margin: '5px 0',
    fontSize: '16px',
    color: '#555',
  },
  button: {
    marginTop: "10px",
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
  },
};

// Export the Profile component
export default Profile;
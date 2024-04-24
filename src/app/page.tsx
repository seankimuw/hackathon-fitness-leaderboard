'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi';

const CONTRACT_ID="0x3d307d82BFB137481ce6316f38eD7f1A772e8d6A";

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: participationFee, isError, error: readError } = useReadContract({
    abi,
    address: CONTRACT_ID, // Replace with your contract's address
    functionName: 'PARTICIPATION_FEE',
  });

  const { data: participants } = useReadContract({
    abi,
    address: CONTRACT_ID, // Replace with your contract's address
    functionName: 'getParticipants',
  });
  const { writeContract } = useWriteContract()
  console.log("result: ", participationFee, isError, readError);
  console.log("participants: ", participants);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <ConnectButton />

      <button 
        onClick={() => 
          writeContract({ 
            abi,
            address: CONTRACT_ID,
            functionName: 'registerUser',
            value: participationFee,
            args: [],
        })
      }
    >
      Join Competition
    </button>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

    <div>{participants?.map((participant) => (
      <div>{participant}</div>
    ))}</div>
    </>
  )
}

export default App

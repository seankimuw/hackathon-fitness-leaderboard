'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi';
import JoinCompetitionPage from './JoinCompetitionPage';
import Profile from './Profile';
import Card from './card';

export const CONTRACT_ID="0x3d307d82BFB137481ce6316f38eD7f1A772e8d6A";

function App() {
  const account = useAccount()
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
  const { writeContract } = useWriteContract();
  console.log("result: ", participationFee, isError, readError);
  // const users = participants?.map((participant) => {
  //   const { data: users } = useReadContract({
  //     abi,
  //     address: CONTRACT_ID, // Replace with your contract's address
  //     functionName: 'users',
  //     args: [participant],
  //   })
  // });
  
  const { data: users } = useReadContract({
    abi,
    address: CONTRACT_ID, // Replace with your contract's address
    functionName: 'users',
    args: ["0xcaC409e24E119Be64359E83CA96932824eaaa605"],
  })
  
  console.log("participants: ", participants);
  console.log("users: ", users);

  return (
    <>
      <ConnectButton />

      
{/*     
      {!account.address || !participants?.includes(account.address) ? (<button 
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
    </button>) : <></>} */}


  {!account.address || !participants?.includes(account.address) ? <JoinCompetitionPage/> : '' }

    {/* {!account.address || !participants?.includes(account.address) ? (<JoinCompetitionPage contractAddress={account.address!}/>) : <></>} */}

    <div>PARTICIPANTS: {participants?.map((participant) => (
      <Card userAddr={participant}/>
    ))}</div>
{/* 
    {account.address && !participants?.includes(account.address) ? (<button 
        onClick={() => 
          writeContract({ 
            abi,
            address: CONTRACT_ID,
            functionName: 'updateSteps',
            args: [BigInt(1)],
        })
      }
    >
      Update Steps : Current Steps {participant}
    </button>) : <></>} */}
    </>

  )
}

export default App

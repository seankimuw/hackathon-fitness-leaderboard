'use client'

import React, { useEffect, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi';
import JoinCompetitionPage from './JoinCompetitionPage';
import Profile from './Profile';
import UserCard from './card';
import EndCompetitionButton from './endCompetitionBtn';
import AppleWatchTracker from './AppleWatchTracker';
import Leaderboard from './Leaderboard';
import { Button, CardActions } from '@mui/material';

export const CONTRACT_ID = "0x2a050cd13674e614eb7a36dd4347d358d46de9f8"

function App() {
  const account = useAccount();

  const { data: participants } = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'getParticipants',
  })

  const { writeContract } = useWriteContract();

  const participantAddresses = participants?.map((participant) => participant.addr);
  
  const sortedParticipants = [...participants ?? []].sort((a, b) => Number(b.weeklySteps) - Number(a.weeklySteps));
  const [winner, setWinner] = useState();

  const currentUser = participants?.find((participant) => participant.addr === account.address);

  const handleStep = () => {
    writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'updateSteps',
        args: [BigInt(1)],
    })
  };


  // useEffect(() => {
  //   if (participants) {
  //     for (let i = 0; i < participants.length; i++) {
  //       let data = useReadContract({
  //         abi,
  //         address: CONTRACT_ID,
  //         functionName: 'users',
  //         args: [participants[i]],
  //       })
  //     }
  //   }
  // }
  // , [participants])
  console.log(participants, participantAddresses, account)
  if (!account || !account.address) {
    return <Profile/>
  }

  return (
    <div >
      <Profile />

      {!participantAddresses || !participantAddresses?.includes(account.address) ? <JoinCompetitionPage /> : <></>}
      {winner || !participantAddresses || !participantAddresses?.includes(account.address) ? <></> : <EndCompetitionButton handleSetWinner={setWinner} sortedParticipants={sortedParticipants}/>}
      {winner ? <h1>{winner} is the winner!</h1> : <></>}
      {/* {participantAddresses && participantAddresses?.includes(account.address) ? 
      (<div className="grid grid-cols-1">
        <h2 className="text-2xl font-bold mt-8 mb-4" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Step Competition</h2>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mg-4">
            {participants?.map((participant) => (
              <UserCard 
                key={participant.addr} 
                userAddr={participant.addr as any}
              />
            ))}
          </div>
        </div>
      </div>) : <>  </>} */}
      
      {/* {participantAddresses && participantAddresses?.includes(account.address) ? 
      (<div className="grid grid-cols-1">
        <h2 className="text-2xl font-bold mt-8 mb-4" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Step Competition</h2>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mg-4">
            {participants?.map((participant) => (

              <AppleWatchTracker participant={participant} key={participant.addr} progress={Number(participant?.weeklySteps) + 10}/>
            ))}
          </div>
        </div>
      </div>) : <>  </>} */}

      {participantAddresses && participantAddresses?.includes(account.address) ? 
      (<Leaderboard sortedParticipants={sortedParticipants} />) : <>  </>}

<CardActions>
            <Button size="small" onClick={handleStep}>Step!</Button>
          </CardActions>
      
    </div>
  )
}

export default App
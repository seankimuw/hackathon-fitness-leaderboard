'use client'

import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi';
import JoinCompetitionPage from './JoinCompetitionPage';
import Profile from './Profile';
import UserCard from './card';
import EndCompetitionButton from './endCompetitionBtn';
import AppleWatchTracker from './AppleWatchTracker';

export const CONTRACT_ID = "0x2a050cd13674e614eb7a36dd4347d358d46de9f8"

function App() {
  const account = useAccount()

  const { writeContract } = useWriteContract();

  const { data: participationFee, isError, error: readError } = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'PARTICIPATION_FEE',
  })

  const { data: participants } = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'getParticipants',
  })

  const participantAddresses = participants?.map((participant) => participant.addr);

  const currentUser = participants?.find((participant) => participant.addr === account.address);


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

      {!participantAddresses || !participantAddresses?.includes(account.address) ? <JoinCompetitionPage /> : <EndCompetitionButton/>}
      {participantAddresses && participantAddresses?.includes(account.address) ? 
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
      </div>) : <>  </>}
      <AppleWatchTracker progress={Number(currentUser?.weeklySteps)}/>
    </div>
  )
}

export default App
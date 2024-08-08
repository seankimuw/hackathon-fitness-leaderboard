'use client'

import React, { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useConnect, useDisconnect, useReadContract, useWriteContract } from 'wagmi'
import { abi } from './abi';
import JoinCompetitionPage from './JoinCompetitionPage';
import Profile from './Profile';
import UserCard from './card';
import EndCompetitionButton from './endCompetitionBtn';

export const CONTRACT_ID = "0x3d307d82BFB137481ce6316f38eD7f1A772e8d6A"

function App() {
  const account = useAccount()

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

  return (
    <div >
      <ConnectButton />
    <EndCompetitionButton/>

      {!account.address || !participants?.includes(account.address) ? <JoinCompetitionPage /> : ''}
      <div className="grid grid-cols-1">
        <h2 className="text-2xl font-bold mt-8 mb-4" style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Step Competition</h2>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mg-4">
            {participants?.map((userAddr, index) => (
              <UserCard 
                key={userAddr} 
                userAddr={userAddr}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
"use client";
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { abi } from './abi';
import { watchContractEvent } from '@wagmi/core';
import { getConfig } from '@/wagmi';
import Profile from './Profile';
import JoinCompetitionPage from './JoinCompetitionPage';
import EndCompetitionButton from './endCompetitionBtn';
import Leaderboard from './Leaderboard';

export const CONTRACT_ID = "0x78dfc914f3770367e206960574c8e29ccefb4920";

function App() {
  const account = useAccount();
  const [winner, setWinner] = useState();

  const { data: participants, refetch } = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'getParticipants',
  });

  useEffect(() => {
    const unwatchRegisterUser = watchContractEvent(getConfig(), {
      address: CONTRACT_ID,
      abi,
      eventName: 'NewUserRegistered',
      onLogs: (logs) => {
        console.log('New User Registered!', logs);
        refetch(); // Re-fetch participants when event is received
      },
    });

    const unwatchSteps = watchContractEvent(getConfig(), {
      address: CONTRACT_ID,
      abi,
      eventName: 'StepsUpdated',
      onLogs: (logs) => {
        console.log('StepsUpdated!', logs);
        refetch(); // Re-fetch participants when event is received
      },
    });

    const unwatchWinner = watchContractEvent(getConfig(), {
      address: CONTRACT_ID,
      abi,
      eventName: 'WeeklyWinner',
      onLogs: (logs) => {
        console.log('WeeklyWinner!', logs);
        refetch(); // Re-fetch participants when event is received
      },
    });


    return () => {
      unwatchRegisterUser(); // Clean up the event listener on component unmount
      unwatchSteps();
      unwatchWinner();
    };
  }, [refetch]);

  const participantAddresses = participants?.map((participant) => participant.addr);
  const sortedParticipants = [...participants ?? []].sort((a, b) => Number(b.weeklySteps) - Number(a.weeklySteps));

  console.log(participants, participantAddresses, account);
  if (!account || !account.address) {
    return <Profile />;
  }

  return (
    <div>
      <Profile />
      {!participantAddresses || !participantAddresses?.includes(account.address) ? <JoinCompetitionPage /> : null}
      {winner || !participantAddresses || !participantAddresses?.includes(account.address) ? null : (
        <EndCompetitionButton/>
      )}
      {winner ? <h1>{winner} is the winner!</h1> : null}
      {participantAddresses && participantAddresses?.includes(account.address) ? (
        <Leaderboard sortedParticipants={sortedParticipants} />
      ) : null}
    </div>
  );
}

export default App;

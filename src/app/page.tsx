'use client';

import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useReadContract, useWatchBlockNumber } from 'wagmi';
import { abi } from './abi';
import Profile from './Profile';
import JoinCompetitionPage from './JoinCompetitionPage';
import Leaderboard from './Leaderboard';
import EndCompetitionButton from './endCompetitionBtn';
import { readContract } from 'wagmi/actions';
import { getConfig } from '@/wagmi';

export const CONTRACT_ID = "0x78dfc914f3770367e206960574c8e29ccefb4920";

function App() {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState();
  const [counter, setCounter] = useState(0);
  const [lastUserSteps, setLastUserSteps] = useState(null);

  useWatchBlockNumber({
    onBlockNumber: async () => {
      const participants = await readContract(getConfig(), {
        abi,
        address: CONTRACT_ID,
        functionName: 'getParticipants',
      });
      setParticipants(participants as any)
      const newUserSteps = participants.find((p) => p.addr === account.address)?.weeklySteps;
      if (lastUserSteps && newUserSteps && newUserSteps > lastUserSteps) {
        setCounter(0);
        setLastUserSteps(newUserSteps);
      }
    }
  })

  useEffect(() => {
    if (!lastUserSteps && participants.length) {
      const currentUser = participants?.find((participant) => participant.addr === account.address);
      setLastUserSteps(currentUser.weeklySteps);
    }
  }, [lastUserSteps, participants])

  const participantAddresses = participants?.map((participant) => participant.addr);
  const sortedParticipants = [...participants ?? []].sort((a, b) => Number(b.weeklySteps) - Number(a.weeklySteps));
  const currentUser = participants?.find((participant) => participant.addr === account.address);

  if (!account || !account.address) {
    return <Profile />;
  }

  return (
    <div>
      <Profile />
      {!participantAddresses || !participantAddresses?.includes(account.address) ? <JoinCompetitionPage /> : null}
      {winner ? <h1>{winner} is the winner!</h1> : null}
      {participantAddresses && participantAddresses?.includes(account.address) ? <Leaderboard sortedParticipants={sortedParticipants} currentUser={currentUser} counter={counter} setCounter={setCounter} /> : null}
      {winner || !participantAddresses || !participantAddresses?.includes(account.address) ? null : <EndCompetitionButton handleSetWinner={setWinner} sortedParticipants={sortedParticipants} />}
    </div>
  );
}

export default App;

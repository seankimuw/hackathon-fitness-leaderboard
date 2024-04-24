"use client";
import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWatchBlockNumber, useWriteContract } from 'wagmi';
import { abi } from './abi';
import { watchContractEvent } from '@wagmi/core';
import { getConfig } from '@/wagmi';
import Profile from './Profile';
import JoinCompetitionPage from './JoinCompetitionPage';
import EndCompetitionButton from './endCompetitionBtn';
import Leaderboard from './Leaderboard';
import { Button, Container, SvgIcon } from '@mui/material';
import { readContract } from 'wagmi/actions';
import runningImage from '../assets/image.png';
import Image, { StaticImageData } from 'next/image';
import ResetCompetitionButton from './resetCompetitionBtn';

export const CONTRACT_ID = "0x78dfc914f3770367e206960574c8e29ccefb4920";

function RunningIcon() {
  return (
    <SvgIcon sx={{ fontSize: 100, color: "white" }}>
<path d="M12 2c-1.1 0-2 .9-2 2v1.5c-1.45.15-2.5 1.35-2.5 2.85 0 .65.25 1.25.65 1.7L9 12l-1.5 1.5c-.75.75-.75 1.95 0 2.7l1.5 1.5c.75.75 1.95.75 2.7 0l1.5-1.5c.75-.75.75-1.95 0-2.7L15 12l1.5-1.5c.4-.45.65-1.05.65-1.7 0-1.5-1.05-2.7-2.5-2.85V4c0-1.1-.9-2-2-2zm0 2c.55 0 1 .45 1 1v1.5c-.55.15-1 .65-1 1.25s.45 1.1 1 1.25V14l-1.5 1.5-1.5-1.5 1.5-1.5V10c-.55-.15-1-.65-1-1.25S10.45 8 11 8V6c0-.55.45-1 1-1zm-3 8.5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm6 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
    </SvgIcon>
  );
}

function App() {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState("");
  const [counter, setCounter] = useState(0);
  const [lastUserSteps, setLastUserSteps] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const participantsData = await readContract(getConfig(), {
          abi,
          address: CONTRACT_ID,
          functionName: 'getParticipants',
        });
        setParticipants(participantsData);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, []); // Run once on component mount

  useWatchBlockNumber({
    onBlockNumber: async () => {
      const participants = await readContract(getConfig(), {
        abi,
        address: CONTRACT_ID,
        functionName: 'getParticipants',
      });
      setParticipants(participants as any)
      let winner;
      try {
        winner = await readContract(getConfig(), {
          abi,
          address: CONTRACT_ID,
          functionName: 'getLastWinner',
        });
        setWinner(winner[0]);
      } catch(e) {
        console.log(e);
      }
      const newUserSteps = participants.find((p) => p.addr === account.address)?.weeklySteps;
      if (lastUserSteps && newUserSteps && newUserSteps >= lastUserSteps) {
        setCounter(0);
        setLastUserSteps(newUserSteps);
      }
    }
  })

  useEffect(() => {
    if (!lastUserSteps && participants.length) {
      const currentUser = participants?.find((participant) => participant.addr === account.address);
      setLastUserSteps(currentUser?.weeklySteps ?? 0);
    }
  }, [lastUserSteps, participants, winner])

  const handleSteps = () => {
    setCounter(prev => ++prev);
    if (counter >= 4) {
      writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'updateSteps',
        args: [BigInt(5)],
      }, {
        onSuccess: () => {
          // setCounter(0);
        }
      });
      console.log("Write contract by 5 steps!")
    }
  };

  const participantAddresses = participants?.map((participant) => participant.addr);
  const sortedParticipants = [...participants ?? []].sort((a, b) => Number(b.weeklySteps) - Number(a.weeklySteps));

  console.log(participants, participantAddresses, account);
  if (!account || !account.address) {
    return <Profile />;
  }

  return (
    <div>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
      }}>
        <Profile />
        {winner || !participantAddresses || !participantAddresses.includes(account.address) ? null : (
          <EndCompetitionButton />
        )}
        {!winner ? null : (
          <ResetCompetitionButton />
        )}
      </header>

      {!participantAddresses || !participantAddresses.includes(account.address) ? <JoinCompetitionPage /> : null}
      {participantAddresses && participantAddresses.includes(account.address) ? (
        <>
          <Leaderboard sortedParticipants={sortedParticipants} counter={counter}/>
          {winner ? (<Container style={{display: "flex", justifyContent:"center", marginTop: "70px"}}>
            <h1>{winner} is the winner!</h1>
          </Container>) : null}
          <Container style={{display: "flex", justifyContent:"center", marginTop: "70px"}}>
            <Button
              onClick={handleSteps}
              variant="contained"
              sx={{
                width: 130,
                height: 130,
                fontSize: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "#1f1f1f"
              }}
            >
              <Image
                src={runningImage as StaticImageData}
                alt='Running Icon'
                layout="fill"
                objectFit="cover"
              />
            </Button>
          </Container>
        </>
      ) : null}
    </div>
  );
}

export default App;

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CONTRACT_ID } from "./page";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "./abi";

export const UserCard = ({ userAddr }: { userAddr: `0x${string}` }) => {
  const account = useAccount();
  const { writeContract } = useWriteContract();
  
  const handleStep = () => {
    writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'updateSteps',
        args: [BigInt(1)],
    })
  };

  const { data: userData } = useReadContract({
    abi,
    address: CONTRACT_ID,
    functionName: 'users',
    args: [userAddr],
  })
  
  // Assuming userData is an array with [address, weeklySteps, exists, ...]
  const address = userData ? userData[0] : userAddr;
  const steps = userData ? userData[1].toString() : "0";
  const isRegistered = userData ? userData[2] : false;

  return (
    <div style={{ margin: "1%" }}>
      <Card sx={{ maxWidth: 200 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {address.slice(0, 6)}...{address.slice(-4)}
          </Typography>
          <Typography variant="h5" component="div">
            Steps: {steps}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {isRegistered ? "Registered" : "Not Registered"}
          </Typography>
        </CardContent>

        {isRegistered && address === account.address && (
          <CardActions>
            <Button size="small" onClick={handleStep}>Step!</Button>
          </CardActions>
        )}
      </Card>
    </div>
  );
}

export default UserCard;
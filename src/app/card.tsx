import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CONTRACT_ID } from "./page";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi } from "./abi";

export const UserCard = ({ participant }: { participant: any }) => {
  const account = useAccount();

  return (
    <div style={{ margin: "1%" }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Name: {participant.addr && participant.addr === account.address ? (<b style={{color: "green"}}>{participant.name}</b>) : participant.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Steps: {Number(participant.weeklySteps) ?? 0}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Status: {participant ? "Registered" : "Not Registered"}
          </Typography>
        </CardContent>

      </Card>
    </div>
  );
}

export default UserCard;
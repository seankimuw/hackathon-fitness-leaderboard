import * as React from "react";
import Box from "@mui/material/Box";
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
  const [stepCount, setStepCount] = React.useState(0);

  const { writeContract } = useWriteContract();
  
  const handleStep = () => {
    writeContract({ 
        abi,
        address: CONTRACT_ID,
        functionName: 'updateSteps',
        args: [BigInt(1)],
    })
    setStepCount(prevCount => prevCount + 1);
  };

  const { data: users } = useReadContract({
    abi,
    address: CONTRACT_ID, // Replace with your contract's address
    functionName: 'users',
    args: [userAddr],
  })
  
  console.log(users);

  return (
    <div style={{ margin: "1%" }}>
      <Card sx={{ maxWidth: 200 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {userAddr}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Steps: {users ? users[1].toString() : "0"}
          </Typography>
        </CardContent>

        {users && users[0] === account.address && (<CardActions>
          <Button size="small" onClick={handleStep}>Step!</Button>
        </CardActions>)}
      </Card>
    </div>
  );
}

export default UserCard;
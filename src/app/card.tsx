import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const UserCard = ({ userAddr = 'friend1' }) => {
  const [stepCount, setStepCount] = React.useState(0);

  const handleStep = () => {
    setStepCount(prevCount => prevCount + 1);
  };

  return (
    <div style={{ margin: "1%" }}>
      <Card sx={{ maxWidth: 200 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {userAddr}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Steps: {stepCount}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleStep}>Step!</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default UserCard;
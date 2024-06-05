import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

export default function GradientCircularProgress({ path = "login" }) {
  const [count, setCount] = React.useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (count === 0) {
      const redirectPath = location.state?.from || `/${path}`;
      navigate(redirectPath, { state: { from: location.pathname } });
    }
  }, [count, navigate, location, path]);

  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Typography>Alert! Login to access this link!!!</Typography>
      <Typography>Redirecting you to login page in {count} seconds</Typography>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{
          color: "transparent",
          [`& .${circularProgressClasses.circle}`]: {
            stroke: "url(#my_gradient)",
          },
        }}
      />
    </Stack>
  );
}

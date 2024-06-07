import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Stack } from "@mui/material";
import GradientCircularProgress from "../Spinner";

const PrivatePage = () => {
  const [user, setUser] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        if (auth?.token) {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_API}api/v1/user/user-auth`
            // {
            //   headers: {
            //     Authorization: `Bearer ${auth.token}`
            //   }
            // }
            // removed it since already added in auth as defaults
          );
          if (res.data && res.data.user !== undefined) {
            setUser(res.data.user);
          } else {
            console.error("Unexpected response format:", res);
            setUser(false);
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setUser(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  return (
    <>
      {user ? (
        <Outlet />
      ) : (
        <Stack
          spacing={2}
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <GradientCircularProgress />
        </Stack>
      )}
    </>
  );
};

export default PrivatePage;

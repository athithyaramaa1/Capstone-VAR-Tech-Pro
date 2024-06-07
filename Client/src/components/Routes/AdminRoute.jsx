import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Stack, Typography } from "@mui/material";
import GradientCircularProgress from "../Spinner";

const AdminRoute = () => {
  const [admin, setAdmin] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      if (auth?.token) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_APP_API}api/v1/user/admin-auth`
            //
            // {
            //   headers: {
            //     Authorization: `Bearer ${auth.token}`,
            //   },
            // }
          );
          if (res.data && res.data.admin !== undefined) {
            setAdmin(res.data.admin);
          } else {
            console.error("Unexpected response format:", res);
            setAdmin(false);
          }
        } catch (error) {
          console.error("Error checking admin authentication:", error);
          setAdmin(false);
        }
      }
    };

    authCheck();
  }, [auth?.token]);

  return (
    <>
      {admin ? (
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
          <GradientCircularProgress path="home" />
          <Typography
            level="title-lg"
            className="CompanyName"
            sx={{ color: "red", marginTop: "40%" }}
          >
            Unauthorized access!! You're not allowed to access this link
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default AdminRoute;

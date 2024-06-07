import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { TextField, Button, Typography, Paper, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_APP_API}api/v1/user/forgot-password`,
        {
          email,
          question: answer,
          newPassword,
        }
      );
      if (res && res.data.message) {
        toast.success(res.data.message);
        toast.success("You'll be redirected to the login page.!");
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <Paper
        style={{
          padding: "20px",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "7%",
        }}
        elevation={5}
      >
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "800" }}
        >
          RESET PASSWORD
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            label="Who is your childhood best friend?"
            variant="outlined"
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <TextField
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password"
            variant="outlined"
            fullWidth
            required
            style={{ marginBottom: "10px" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
          >
            RESET
          </Button>
        </form>
      </Paper>
      <ToastContainer />
    </Layout>
  );
};

export default ForgotPassword;

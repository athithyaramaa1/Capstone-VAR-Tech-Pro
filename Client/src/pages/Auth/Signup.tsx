import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import GoogleIcon from "./GoogleIcon";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  address: HTMLInputElement;
  phone: HTMLInputElement;
  question: HTMLInputElement;
  persistent: HTMLInputElement;
}

interface SignUpFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // At least 8 characters, one uppercase, one lowercase, one digit, and one symbol

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function SignUp() {
  const navigate = useNavigate(); 
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string>("");
  const [errorToastCount, setErrorToastCount] = React.useState(0);
  const [lastErrorToastTime, setLastErrorToastTime] = React.useState(0);

  const showToast = (message, options = {}) => {
    toast.error(message, options);
  };

  const handleErrors = (errorMessage) => {
    setErrorToastCount((prevCount) => prevCount + 1);
    showToast(errorMessage);
  
    setTimeout(() => {
      setErrorToastCount((prevCount) => prevCount - 1);
    }, 5000);
  
    const currentTime = Date.now();
    console.log("Current time:", currentTime);
    console.log("Last error toast time:", lastErrorToastTime);
    console.log("Error toast count:", errorToastCount);
  
    if (errorToastCount >= 5 && currentTime - lastErrorToastTime < 5000) {
      showToast("Too many bad requests. Try again after sometime", {
        position: toast.POSITION.TOP_CENTER,
        className: "vibrating-toast",
      });
      setErrorToastCount(0); // Reset error count after displaying the "Too many bad requests" toast
      setLastErrorToastTime(currentTime);
      return; // Exit function to avoid showing duplicate toasts
    }
  
    setLastErrorToastTime(currentTime);
  };

  const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    setServerError("");
    const formElements = event.currentTarget.elements;
    const data = {
      name: formElements.name.value,
      email: formElements.email.value,
      password: formElements.password.value,
      address: formElements.address.value,
      phone: formElements.phone.value,
      question: formElements.question.value,
      persistent: formElements.persistent.checked,
    };

    if (!phoneRegex.test(data.phone)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Please enter a valid 10-digit phone number",
      }));
      handleErrors("Please enter a valid 10-digit phone number");
      return;
    }
    if (!passwordRegex.test(data.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one digit, and one symbol",
      }));
      handleErrors(
        "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, one digit, and one symbol"
      );
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API}api/v1/user/register`,
        data
      );
      toast.success("Registered Successfully!");
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
        setServerError(error.response.data.error || "Registration failed");
        handleErrors(error.response.data.error || "Registration failed");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setServerError("No response received from server");
        handleErrors("No response received from server");
      } else {
        console.error("Error making request:", error.message);
        setServerError("Error making request");
        handleErrors("Error making request");
      }
    }
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s",
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Athithya Tech Pro</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already a member?{" "}
                  <Link component="a" href="/login" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#FFF", md: "text.tertiary" },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <FormControl required>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Address</FormLabel>
                  <Input type="address" name="address" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Phone number</FormLabel>
                  <Input type="phone" name="phone" />
                  {errors.phone && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.phone}
                    </Typography>
                  )}
                </FormControl>
                <FormControl required error={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                  {errors.password && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.password}
                    </Typography>
                  )}
                </FormControl>
                <FormControl required error={!!errors.password}>
                  <FormLabel>Security Question: Who was your childhood best friend?</FormLabel>
                  <Input type="question" name="question" />
                  {errors.question && (
                    <Typography variant="caption" sx={{ color: "red" }}>
                      {errors.question}
                    </Typography>
                  )}
                </FormControl>
                <FormControl required>
                  <FormLabel>
                    <Checkbox size="sm" name="persistent" /> Remember me
                  </FormLabel>
                </FormControl>
                {serverError && (
                  <Typography
                    variant="body1"
                    sx={{ color: "red", fontWeight: "bold", mt: 2 }}
                  >
                    {serverError}
                  </Typography>
                )}
                <Button type="submit" fullWidth>
                  Sign up
                </Button>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Athithya TECH PRO {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
      <ToastContainer />
    </CssVarsProvider>
  );
}

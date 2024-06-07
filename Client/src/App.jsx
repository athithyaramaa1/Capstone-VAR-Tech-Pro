import { Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import SplashPage from "./pages/Splash Page/App";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;

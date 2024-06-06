import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const HomePage = ({ showToast }) => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    if (showToast && location.state && location.state.showToast) {
      toast.success("Logged in successfully!");
    }
  }, [showToast, location.state]);

  return (
    <Layout title={"Best Offers!"}>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;

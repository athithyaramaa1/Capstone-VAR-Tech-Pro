import { Route } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";

function App() {
  return (
    <>
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/*" element={<NotFound />} />
    </>
  );
}

export default App;

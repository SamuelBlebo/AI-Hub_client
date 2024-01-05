import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//components
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;

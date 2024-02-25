import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";

import "./App.css";

//components
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Sidebar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
          <Route path="/signup" or element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

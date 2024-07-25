import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import Landing from "./pages/landing";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

function App() {

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  const goHome = () => {
    navigate("/");
  }

  return (
    <div className='App min-h-screen'>
      <Header goHome={goHome} />
      <Routes>
        <Route path="/" element={<Landing handleHome={goHome} />} />
        <Route path="/signin" element={<Signin goHome={goBack} />} />
        <Route path="/signup" element={<Signup goHome={goBack} />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App

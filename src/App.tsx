import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";

import Container from "./components/Container";
import Header from "./components/Header";
import Landing from "./pages/landing";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

function App() {

  const navigate = useNavigate();
  // @ts-ignore
  const goToPage = (e: React.MouseEvent<HTMLElement>, path?: string) : void => {
    navigate("/" + (path ? path : ""));
  }

  return (
    <div className='App min-h-screen'>
      <Header goToPage={goToPage} />

      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin goToPage={goToPage} />} />
          <Route path="/signup" element={<Signup goToPage={goToPage} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>

    </div>
  )
}

export default App
import './App.css'
import { Route, Routes, useNavigate } from "react-router-dom";

import Container from "./components/Container";
import Header from "./components/Header";
import Landing from "./pages/landing";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";
import ResetUser from './pages/resetUser';
import ResetPassword from './pages/resetPassword';
import { NotifyContainer } from './utils/notifications';

function App() {

  const navigate = useNavigate();
  // @ts-ignore
  const goToPage = (e: React.MouseEvent<HTMLElement>, path?: string) : void => {
    navigate("/" + (path ? path : ""));
  }

  return (
    <div className='App min-h-screen'>

      <NotifyContainer />
      <Header goToPage={goToPage} />

      <Container>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin goToPage={goToPage} />} />
          <Route path="/signup" element={<Signup goToPage={goToPage} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resetUser" element={<ResetUser goToPage={goToPage} />} />
          <Route path="/resetPassword" element={<ResetPassword goToPage={goToPage} />} />
        </Routes>
      </Container>

    </div>
  )
}

export default App
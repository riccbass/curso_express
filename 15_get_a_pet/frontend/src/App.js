import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Message from "./components/layout/Message";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;

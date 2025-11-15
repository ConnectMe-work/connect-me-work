import { Routes, Route } from "react-router";
import { Container, Box } from "@mui/material";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "sticky", top: 0, zIndex: 1100 }}>
        <NavBar />
      </Box>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;

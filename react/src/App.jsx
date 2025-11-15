import { Routes, Route } from 'react-router'
import { Container, Box, Typography } from '@mui/material'
import Home from './pages/Home'
import About from './pages/About'
import NavBar from './components/NavBar'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
    </Box>
  )
}

export default App
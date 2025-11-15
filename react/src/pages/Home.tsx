import { Box, Paper, Stack, Typography } from "@mui/material";
import EvenForm from "src/sections/EventForm/EvenForm";

function Home() {
  return (
    <Stack rowGap={3}>
      <Typography variant="h5" component="h1" gutterBottom>
        Record your defection act
      </Typography>
      <EvenForm />
    </Stack>
  );
}

export default Home;
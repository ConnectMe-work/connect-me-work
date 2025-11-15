import { Box, Paper, Stack, Typography } from "@mui/material";
import EvenForm from "src/components/EvenForm";

function Home() {
  return (
    <Box justifyContent="center" display="flex" >
      <Stack rowGap={3} maxWidth={600} flexWrap="wrap" width="100%" >
        <Typography variant="h5" component="h1" gutterBottom>
          Record your defection act
        </Typography>
        <EvenForm />
      </Stack>
    </Box>
  );
}

export default Home;
import { Typography, Paper, Box, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";

function About() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        About This Project
      </Typography>

      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" paragraph>
          This is a modern React application scaffolded with Vite and configured
          with a complete tech stack for building scalable applications.
        </Typography>
        <Typography variant="body1" paragraph>
          Current date: {dayjs().format("MMMM D, YYYY")}
        </Typography>
      </Paper>
    </Box>
  );
}

export default About;

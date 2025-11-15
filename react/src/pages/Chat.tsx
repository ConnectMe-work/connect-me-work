import { Typography, Paper, Box, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";

function Chat() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Here will be chat
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1">Chat will be implemented here.</Typography>
      </Paper>
    </Box>
  );
}

export default Chat;

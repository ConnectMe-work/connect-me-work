import { AppBar, Toolbar, Typography, Button, Box, Stack, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router";

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" width="100%">
          <Stack direction="row" alignItems="center">
            <Typography variant="h4" color="primary" fontWeight="bold">Connect</Typography>
            <Typography variant="h4" color="secondary" fontWeight="bold" >Me</Typography>
          </Stack>

          <Box>
            <Button color="inherit" component={RouterLink} to="/">
              Recording
            </Button>
            <Button color="inherit" component={RouterLink} to="/chat">
              Chat
            </Button>
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

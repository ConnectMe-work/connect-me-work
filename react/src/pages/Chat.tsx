import { Container } from "@mui/material";
import AIChat from "src/components/AIChat";

function Chat() {
  return (
    <Container
      sx={[
        () => ({
          display: 'flex',
          flex: 1,
          height: 'calc(100vh - 150px)',
          flexDirection: 'column',
        }),
      ]}

    >
      <AIChat />
    </Container>
  );
}

export default Chat;

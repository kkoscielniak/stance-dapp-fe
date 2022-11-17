import { createClient, useAccount, WagmiConfig } from "wagmi";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getDefaultProvider } from "ethers";
import { Container } from "@mui/system";
import { SnackbarProvider } from "notistack";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import AskQuestionForm from "./components/AskQuestionForm/AskQuestionForm";
import connectors from "./config/connectors";
import NavBar from "./components/NavBar/NavBar";

const client = createClient({
  // autoConnect: true,
  connectors,
  provider: getDefaultProvider("goerli"),
});

function App() {
  const { isConnected } = useAccount();

  return (
    <WagmiConfig client={client}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
      >
        <NavBar />
        <Container maxWidth="md">
          {isConnected && (
            <>
              <AskQuestionForm />
              <QuestionsList />
            </>
          )}
        </Container>
      </SnackbarProvider>
    </WagmiConfig>
  );
}

export default App;

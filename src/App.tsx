import { createClient, WagmiConfig } from "wagmi";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { getDefaultProvider } from "ethers";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import AskQuestionForm from "./components/AskQuestionForm/AskQuestionForm";
import connectors from "./config/connectors";
import NavBar from "./components/NavBar/NavBar";
import { Container } from "@mui/system";

const client = createClient({
  // autoConnect: true,
  connectors,
  provider: getDefaultProvider("goerli"),
});

function App() {
  return (
    <WagmiConfig client={client}>
      <NavBar />
      <Container maxWidth="md">
        <AskQuestionForm />
        <QuestionsList />
      </Container>
    </WagmiConfig>
  );
}

export default App;

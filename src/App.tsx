import { createClient, WagmiConfig } from "wagmi";
import { getDefaultProvider } from "ethers";
import Wallet from "./components/Wallet/Wallet";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import AskQuestionForm from "./components/AskQuestionForm/AskQuestionForm";
import connectors from "./config/connectors";

const client = createClient({
  // autoConnect: true,
  connectors,
  provider: getDefaultProvider("goerli"),
});

function App() { 
  return (
    <WagmiConfig client={client}> 
      <Wallet />
      <AskQuestionForm />
      <QuestionsList />
    </WagmiConfig> 
  );
}

export default App;

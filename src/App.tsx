import { createClient, WagmiConfig } from "wagmi";
import { getDefaultProvider } from "ethers";
import Wallet from "./components/Wallet/Wallet";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import AskQuestionForm from "./components/AskQuestionForm/AskQuestionForm";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider("http://localhost:8545"),
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

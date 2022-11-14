import logo from "./logo.svg";
import "./App.css";
import { createClient, WagmiConfig } from "wagmi";
import { getDefaultProvider } from "ethers";
import Profile from "./Profile";

const client = createClient({
  // autoConnect: true,
  provider: getDefaultProvider(),
});

function App() {

  return (
    <WagmiConfig client={client}>
      <Profile/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </WagmiConfig>
  );
}

export default App;

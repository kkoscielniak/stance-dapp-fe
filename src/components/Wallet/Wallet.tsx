import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

const Wallet = () => {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const handleConnect = () => connect();
  const handleDisconnect = () => disconnect();
  
  if (!isConnected) {
    return (<button onClick={handleConnect}>Connect wallet</button>)
  }

  return (
    <>
      <p>Connected to Wallet: {address}</p>
      <button onClick={handleDisconnect}>Disconnect</button>
    </>
  );
};

export default Wallet;

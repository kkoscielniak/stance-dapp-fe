import { useAccount, useConnect, useDisconnect } from "wagmi";
import connectors from "../../../config/connectors";

const Wallet = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const handleConnect = () => connect({ connector: connectors[0] });
  const handleDisconnect = () => disconnect();

  if (!isConnected) {
    return <button onClick={handleConnect}>Connect wallet</button>;
  }

  return (
    <>
      <p>Connected to Wallet: {address}</p>
      <button onClick={handleDisconnect}>Disconnect</button>
    </>
  );
};

export default Wallet;

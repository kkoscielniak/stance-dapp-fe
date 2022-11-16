import Button from "@mui/material/Button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import connectors from "../../../config/connectors";

const shortenTheAddress = (address?: string) =>
  address && `${address.substring(0, 4)}...${address.substring(
    address.length - 4,
    address.length
  )}`;

const WalletButton = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const handleConnect = () => connect({ connector: connectors[0] });
  const handleDisconnect = () => disconnect();

  if (isConnected) {
    return (
      <Button color="inherit" onClick={handleDisconnect} startIcon={<LogoutIcon />}>
        {shortenTheAddress(address)}
      </Button>
    );
  }

  return (
    <Button color="inherit" onClick={handleConnect} startIcon={<LoginIcon />}>
      Connect wallet
    </Button>
  );
};

export default WalletButton;

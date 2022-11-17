import Button from "@mui/material/Button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import connectors from "../../../config/connectors";
import { Tooltip } from "@mui/material";
import shortenTheAddress from "../../../utils/shortenTheAddress";

const WalletButton = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const handleConnect = () => connect({ connector: connectors[0] });
  const handleDisconnect = () => disconnect();

  if (isConnected) {
    return (
      <Tooltip title="Disconnect wallet">
        <Button
          color="inherit"
          onClick={handleDisconnect}
          startIcon={<LogoutIcon />}
        >
          {shortenTheAddress(address)}
        </Button>
      </Tooltip>
    );
  }

  return (
    <Button color="inherit" onClick={handleConnect} startIcon={<LoginIcon />}>
      Connect wallet
    </Button>
  );
};

export default WalletButton;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import WalletButton from "./WalletButton/WalletButton";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stance Demo dApp
        </Typography>
        <WalletButton />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

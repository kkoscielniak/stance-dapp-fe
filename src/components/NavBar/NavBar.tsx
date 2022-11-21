import { Box, Divider } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GitHubLinkButton from "./GitHubLink/GitHubLinkButton";
import PrizePoolButton from "./PrizePool/PrizePool";
import WalletButton from "./WalletButton/WalletButton";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stance Demo dApp
        </Typography>
        <Box
          sx={{
            display: "flex",
            borderRadius: 1,
            "& hr": {
              mx: 0.5,
            },
          }}
        >
          <GitHubLinkButton />
          <Divider orientation="vertical" flexItem />
          <PrizePoolButton />
          <Divider orientation="vertical" flexItem />
          <WalletButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

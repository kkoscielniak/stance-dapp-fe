import { GitHub } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

const GitHubLinkButton = () => {
  return (
    <Tooltip title="Star me on GitHub">
      <Button color="inherit" startIcon={<GitHub />}>
        kkoscielniak/stance-dapp
      </Button>
    </Tooltip>
  );
};

export default GitHubLinkButton;

import RedeemIcon from "@mui/icons-material/Redeem";
import { Button, Tooltip } from "@mui/material";
import { useBalance } from "wagmi";
import config from "../../../config/config";

const PrizePool = () => {
  const { data, isError, error, isLoading } = useBalance({
    // @ts-ignore
    address: config.CONTRACT_ADDRESS,
  });

  return data ? (
    <Tooltip title="Prize pool">
      <Button color="inherit" startIcon={<RedeemIcon />}>
        {data?.formatted} ETH
      </Button>
    </Tooltip>
  ) : null;
};

export default PrizePool;

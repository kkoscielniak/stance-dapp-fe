import RedeemIcon from "@mui/icons-material/Redeem";
import { Button, Tooltip } from "@mui/material";
import { useBalance } from "wagmi";
import config from "../../../config/config";

const PrizePoolButton = () => {
  const { data, isError } = useBalance({
    // @ts-ignore
    address: config.CONTRACT_ADDRESS,
  });

  if (isError) {
    return null;
  }

  return data ? (
    <Tooltip title="Prize pool">
      <Button color="inherit" startIcon={<RedeemIcon />}>
        {data?.formatted} {data?.symbol}
      </Button>
    </Tooltip>
  ) : null;
};

export default PrizePoolButton;

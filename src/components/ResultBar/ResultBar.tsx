import styled from "@emotion/styled";
import { LinearProgress, linearProgressClasses, Tooltip } from "@mui/material";
import calculatePositiveToNegativeRatio from "../../utils/calculatePositiveToNegativeRatio";

const StyledLinearBar = styled(LinearProgress)(({ value, theme }) => ({
  height: 30,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: `${value === 0 ? "gray" : theme}`,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 0,
  },
}));

type Props = {
  positiveResponsesCount: number;
  negativeResponsesCount: number;
};

const ResultBar = ({
  positiveResponsesCount,
  negativeResponsesCount,
}: Props) => {
  const ratio = calculatePositiveToNegativeRatio(
    positiveResponsesCount,
    negativeResponsesCount
  );

  return (
    <Tooltip
      title={
        <>
          <p>Agrees: {positiveResponsesCount}</p>
          <p>Disagrees: {negativeResponsesCount}</p>
          <p>Ratio: {ratio.toFixed(0)}%</p>
        </>
      }
    >
      <StyledLinearBar
        variant="determinate"
        value={ratio}
        sx={{ marginTop: 2 }}
      />
    </Tooltip>
  );
};

export default ResultBar;

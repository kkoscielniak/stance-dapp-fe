import { getParsedEthersError } from "@enzoferey/ethers-error-parser";
import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { QuestionType } from "../../types/Question"; // TODO: Remove it in favor of `abitype`
import useCommonWrite from "../../hooks/useCommonWrite";
import {
  shortenTheAddress,
  convertTimestampToDateString,
} from "../../utils/textUtils";
import ResultBar from "../ResultBar/ResultBar";
import ButtonWithProcessing from "../shared/ButtonWithProcessing";

type Props = {
  id: number;
  question: QuestionType;
};

const QuestionCard = ({
  question: {
    question,
    author,
    timestamp,
    positiveResponsesCount,
    negativeResponsesCount,
  },
  id,
}: Props) => {
  const [prepareError, setPrepareError] = useState<string | undefined>();

  const { enqueueSnackbar } = useSnackbar();

  const handlePrepareError = (error: Error) => {
    const { context } = getParsedEthersError(error);
    setPrepareError(context);
  };

  const {
    write: respondPositively,
    isMakingTransaction: isMakingAgreement,
    isProcessingTransaction: isProcessingAgreement,
    isPrepareError: isPreparePositiveResponseError,
  } = useCommonWrite({
    functionName: "respondToQuestionPositively",
    args: [BigNumber.from(id)],
    onPrepareError(error) {
      handlePrepareError(error);
    },
    onWaitSuccess() {
      enqueueSnackbar("Agreement saved!");
    },
  });

  const {
    write: respondNegatively,
    isMakingTransaction: isMakingDisagreement,
    isProcessingTransaction: isProcessingDisagreement,
    isPrepareError: isPrepareNegativeResponseError,
  } = useCommonWrite({
    functionName: "respondToQuestionNegatively",
    args: [BigNumber.from(id)],
    onPrepareError(error) {
      handlePrepareError(error);
    },
    onWaitSuccess() {
      enqueueSnackbar("Disagreement saved!");
    },
  });

  const handlePositiveResponseClick = () => {
    respondPositively?.();
  };

  const handleNegativeResponseClick = () => {
    respondNegatively?.();
  };

  const isProcessing =
    isMakingAgreement ||
    isProcessingAgreement ||
    isMakingDisagreement ||
    isProcessingDisagreement;

  return (
    <Card>
      <CardHeader
        titleTypographyProps={{ variant: "subtitle1" }}
        subheaderTypographyProps={{ variant: "subtitle2" }}
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVert />
        //   </IconButton>
        // }
        title={shortenTheAddress(author)}
        subheader={convertTimestampToDateString(timestamp.toNumber())}
      />
      <CardContent>
        <Typography>{question ? question : "no-title"}</Typography>
        <ResultBar
          positiveResponsesCount={positiveResponsesCount}
          negativeResponsesCount={negativeResponsesCount}
        />
      </CardContent>
      <Tooltip title={prepareError}>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <ButtonWithProcessing
            onClick={handlePositiveResponseClick}
            startIcon={<ThumbUp />}
            isProcessing={isProcessing}
            disabled={!respondPositively || isPreparePositiveResponseError}
          >
            Agree
          </ButtonWithProcessing>
          <ButtonWithProcessing
            onClick={handleNegativeResponseClick}
            startIcon={<ThumbDown />}
            isProcessing={isProcessing}
            disabled={!respondNegatively || isPrepareNegativeResponseError}
          >
            Disagree
          </ButtonWithProcessing>
        </CardActions>
      </Tooltip>
    </Card>
  );
};

export default QuestionCard;

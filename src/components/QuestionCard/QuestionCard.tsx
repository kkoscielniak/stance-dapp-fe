import { MoreVert, ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import {
  useAccount,
} from "wagmi";
import { QuestionType } from "../../types/Question"; // TODO: Remove it in favor of `abitype`
import useCommonWrite from "../../useCommonWrite";
import shortenTheAddress from "../../utils/shortenTheAddress";
import ResultBar from "../ResultBar/ResultBar";
import ButtonWithProcessing from "../shared/ButtonWithProcessing";

type Props = {
  id: number;
  question: QuestionType;
};

const convertTimestampToDateString = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);

  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeString = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${dateString} | ${timeString}`;
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
  const { address: ownerAddress } = useAccount();

  const isOwner = author === ownerAddress;

  const { enqueueSnackbar } = useSnackbar();

  const enqueueErrorSnackbar = (error: Error) => {
    enqueueSnackbar(`An error occured: ${error.message}`, {
      variant: "error",
    });
  };

  const {
    write: respondPositively,
    isMakingTransaction: isMakingAgreement,
    isProcessingTransaction: isProcessingAgreement,
  } = useCommonWrite({
    functionName: "respondToQuestionPositively",
    args: [BigNumber.from(id)],
    isEnabled: !isOwner,
    // onPrepareError: enqueueErrorSnackbar,
    // onWriteError: enqueueErrorSnackbar,
    // onWaitError: enqueueErrorSnackbar,
    onWaitSuccess() {
      enqueueSnackbar("Agreement saved!");
    },
  });

  const {
    write: respondNegatively,
    isMakingTransaction: isMakingDisagreement,
    isProcessingTransaction: isProcessingDisagreement,
  } = useCommonWrite({
    functionName: "respondToQuestionNegatively",
    args: [BigNumber.from(id)],
    isEnabled: !isOwner,
    // onPrepareError: enqueueErrorSnackbar,
    // onWriteError: enqueueErrorSnackbar,
    // onWaitError: enqueueErrorSnackbar,
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
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={shortenTheAddress(author)}
        subheader={convertTimestampToDateString(timestamp.toNumber())}
      />
      {/* <CardMedia
        component="img"
        height="200"
        image="https://picsum.photos/200/200"
      /> */}
      <CardContent>
        <Typography>{question ? question : "no-title"}</Typography>
        <ResultBar
          positiveResponsesCount={positiveResponsesCount}
          negativeResponsesCount={negativeResponsesCount}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ButtonWithProcessing
          onClick={handlePositiveResponseClick}
          startIcon={<ThumbUp />}
          isProcessing={isProcessing}
          disabled={!respondPositively}
        >
          Agree
        </ButtonWithProcessing>
        <ButtonWithProcessing
          onClick={handleNegativeResponseClick}
          startIcon={<ThumbDown />}
          isProcessing={isProcessing}
          disabled={!respondNegatively}
        >
          Disagree
        </ButtonWithProcessing>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;

import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { BigNumber } from "ethers";
import { useSnackbar } from "notistack";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { StanceArtifact } from "../../abi/Stance";
import config from "../../config/config";
import { QuestionType } from "../../types/Question";
import ResultBar from "../ResultBar/ResultBar";

type Props = {
  id: number;
  question: QuestionType;
};

const QuestionCard = ({
  question: { question, positiveResponsesCount, negativeResponsesCount },
  id,
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { config: positiveResponseConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,
    functionName: "respondToQuestionPositively",
    args: [BigNumber.from(id)],
  });

  const { write: respondPositively } = useContractWrite({
    ...positiveResponseConfig,
    onSuccess(data) {
      console.log("respondToQuestionPositively success", data);
      enqueueSnackbar("Response saved!");
    },
    onError(error) {
      console.log("respondToQuestionPositively error", error);
      enqueueSnackbar(`An error occured: ${error.message}`, {
        variant: "error",
      });
    },
  });

  const { config: negativeResponseConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,

    functionName: "respondToQuestionNegatively",
    args: [BigNumber.from(id)],
  });

  const { write: respondNegatively } = useContractWrite({
    ...negativeResponseConfig,
    onSuccess(data) {
      console.log("respondToQuestionNegatively success", data);
      enqueueSnackbar("Response saved!");
    },
    onError(error) {
      console.log("respondToQuestionNegatively error", error);
      enqueueSnackbar(`An error occured: ${error.message}`, {
        variant: "error",
      });
    },
  });

  const handlePositiveResponseClick = () => {
    respondPositively?.();
  };

  const handleNegativeResponseClick = () => {
    respondNegatively?.();
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="200"
        image="https://picsum.photos/200/200"
      />
      <CardContent>
        <Typography>{question ? question : "no-title"}</Typography>
        <ResultBar
          positiveResponsesCount={positiveResponsesCount}
          negativeResponsesCount={negativeResponsesCount}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button onClick={handlePositiveResponseClick} startIcon={<ThumbUp />}>
          Agree
        </Button>
        <Button onClick={handleNegativeResponseClick} startIcon={<ThumbDown />}>
          Disagree
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;

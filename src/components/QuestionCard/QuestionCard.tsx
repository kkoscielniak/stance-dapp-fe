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
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { StanceArtifact } from "../../abi/Stance";
import config from "../../config/config";
import { QuestionType } from "../../types/Question";
import ResultBar from "../ResultBar/ResultBar";
import ButtonWithProcessing from "../shared/ButtonWithProcessing";

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

  const { data: positiveResponseData, write: respondPositively, isLoading: isMakingAgreement } =
    useContractWrite({
      ...positiveResponseConfig,
      onError(error) {
        console.log("respondToQuestionPositively error", error);
        enqueueSnackbar(`An error occured: ${error.message}`, {
          variant: "error",
        });
      },
    });

  const { isLoading: isProcessingAgreement } = useWaitForTransaction({
    hash: positiveResponseData?.hash,
    onSuccess(data) {
      console.log("respondToQuestionPositively success", data);
      enqueueSnackbar("Response saved!");
    },
    onError(error) {
      console.log("[wait] respondToQuestionPositively error", error);
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

  const { data: negativeResponseData, write: respondNegatively, isLoading: isMakingDisagreement } =
    useContractWrite({
      ...negativeResponseConfig,
      onError(error) {
        console.log("respondToQuestionNegatively error", error);
        enqueueSnackbar(`An error occured: ${error.message}`, {
          variant: "error",
        });
      },
    });

  const { isLoading: isProcessingDisagreement } = useWaitForTransaction({
    hash: negativeResponseData?.hash,
    onSuccess(data) {
      console.log("respondToQuestionNegatively success", data);
      enqueueSnackbar("Response saved!");
    },
    onError(error) {
      console.log("[wait] respondToQuestionNegatively error", error);
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

  const isProcessing = isMakingAgreement || isProcessingAgreement || isMakingDisagreement || isProcessingDisagreement;

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
        <ButtonWithProcessing
          onClick={handlePositiveResponseClick}
          startIcon={<ThumbUp />}
          isProcessing={isProcessing}
        >
          Agree
        </ButtonWithProcessing>
        <ButtonWithProcessing
          onClick={handleNegativeResponseClick}
          startIcon={<ThumbDown />}
          isProcessing={isProcessing}
        >
          Disagree
        </ButtonWithProcessing>
      </CardActions>
    </Card>
  );
};

export default QuestionCard;

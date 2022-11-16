import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import StanceAbi from "../../abi/Stance.json";
import config from "../../config";
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
  const { config: positiveResponseConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceAbi.abi,
    functionName: "respondToQuestionPositively",
    args: [id],
  });

  const {
    // data,
    // isLoading,
    // isSuccess,
    write: respondPositively,
  } = useContractWrite(positiveResponseConfig);

  const { config: negativeResponseConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceAbi.abi,
    functionName: "respondToQuestionNegatively",
    args: [id],
  });

  const {
    // data,
    // isLoading,
    // isSuccess,
    write: respondNegatively,
  } = useContractWrite(negativeResponseConfig);

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
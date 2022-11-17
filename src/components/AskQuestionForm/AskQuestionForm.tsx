import {
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { StanceArtifact } from "../../abi/Stance";
import config from "../../config/config";
import SendIcon from "@mui/icons-material/Send";
import ButtonWithProcessing from "../shared/ButtonWithProcessing";

const AskQuestionForm = () => {
  const [questionText, setQuestionText] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const { config: contractConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,
    functionName: "askQuestion",
    args: [questionText],
  });

  const {
    data: transactionData,
    isLoading: isMakingTransaction,
    write,
  } = useContractWrite({
    ...contractConfig,
    onError(error) {
      console.log("askQuestion error", error);
      enqueueSnackbar(`An error occured: ${error.message}`, {
        variant: "error",
      });
    },
  });

  const { isLoading: isProcessingTransaction } = useWaitForTransaction({
    hash: transactionData?.hash,
    onSuccess(data) {
      console.log("askQuestion success", data);
      setQuestionText("");
      enqueueSnackbar("Question asked!");
    },
    onError(error) {
      console.log("[wait] askQuestion error", error);
      enqueueSnackbar(`An error occured: ${error.message}`, {
        variant: "error",
      });
    },
  });

  const handleInputChange = (event: any) => {
    setQuestionText(event.target.value);
  };

  const handleSubmit = () => {
    write?.();
  };

  const isLoading = isMakingTransaction || isProcessingTransaction;

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          label="Ask the community..."
          variant="standard"
          value={questionText}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <ButtonWithProcessing
          onClick={handleSubmit}
          disabled={!write || isLoading}
          isProcessing={isLoading}
          startIcon={<SendIcon />}
          variant="outlined"
        >
          Submit
        </ButtonWithProcessing>
      </CardActions>
    </Card>
  );
};

export default AskQuestionForm;

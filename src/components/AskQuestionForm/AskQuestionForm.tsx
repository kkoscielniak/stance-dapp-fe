import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { StanceArtifact } from "../../abi/Stance";
import config from "../../config";

const AskQuestionForm = () => {
  const [questionText, setQuestionText] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const { config: contractConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,
    functionName: "askQuestion",
    args: [questionText],
  });

  const { isLoading, write } = useContractWrite({
    ...contractConfig,
    onSuccess(data) {
      console.log("askQuestion success", data);
      enqueueSnackbar("Question saved!");
    },
    onError(error) {
      console.log("askQuestion error", error);
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
        <Button onClick={handleSubmit} disabled={!write || isLoading}>
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AskQuestionForm;

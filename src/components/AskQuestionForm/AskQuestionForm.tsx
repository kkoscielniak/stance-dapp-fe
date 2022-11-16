import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import StanceAbi from "../../abi/Stance.json";
import config from "../../config";

const AskQuestionForm = () => {
  const { isConnected } = useAccount();

  const [questionText, setQuestionText] = useState<string>("");

  const { config: contractConfig } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceAbi.abi,
    functionName: "askQuestion",
    args: [questionText],
  });

  const { data, isLoading, isSuccess, write } =
    useContractWrite(contractConfig);

  const handleInputChange = (event: any) => {
    setQuestionText(event.target.value);
  };

  const handleSubmit = () => {
    write?.();
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Card sx={{ marginTop: 2 }}>
      <CardContent>
        <TextField
          fullWidth
          label="Ask a question to the community..."
          variant="standard"
          value={questionText}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button onClick={handleSubmit} disabled={!write || isLoading}>
          submit
        </Button>
      </CardActions>
    </Card>
    // <div style={{ margin: "10px 0" }}>
    //   <input
    //     type="text"
    //     placeholder="ask a question to our community"
    //     value={questionText}
    //     onChange={handleInputChange}
    //   ></input>
    //   <button onClick={handleSubmit} disabled={!write}>
    //     submit
    //   </button>
    // </div>
  );
};

export default AskQuestionForm;

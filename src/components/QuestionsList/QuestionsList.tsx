import { useEffect } from "react";
import { useAccount, useContractEvent, useContractRead } from "wagmi";
import config from "../../config";
import StanceAbi from "../../abi/Stance.json";
import QuestionCard from "../QuestionCard/QuestionCard";
import { QuestionType } from "../../types/Question";
import { Unstable_Grid2 as Grid } from "@mui/material";

const QuestionsList = () => {
  const { isConnected } = useAccount();

  const {
    data: questions,
    isError,
    isLoading,
  } = useContractRead({
    address: config.CONTRACT_ADDRESS,
    abi: StanceAbi.abi,
    functionName: "getAllQuestions",
  });

  useContractEvent({
    address: config.CONTRACT_ADDRESS,
    abi: StanceAbi.abi,
    eventName: "QuestionAsked",
    listener(id, question, author) {
      console.log(id, question, author);
    },
  });

  useEffect(() => {
    if (isConnected) {
      console.log(questions);
    }
  }, [isConnected, questions]);

  if (!isConnected) {
    return <p>not connected</p>;
  }

  if (isLoading) {
    return <p>is loading</p>;
  }

  if (isError) {
    return <p>is error</p>;
  }

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {/* @ts-ignore */}
      {questions?.length &&
        /* @ts-ignore */
        questions.map((question: QuestionType, index: number) => (
          <Grid xs={4} spacing={2}>
            <QuestionCard question={question} id={index} key={index} />
          </Grid>
        ))}
    </Grid>
  );
};

export default QuestionsList;

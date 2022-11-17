import { useContractRead } from "wagmi";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import config from "../../config/config";
import { StanceArtifact } from "../../abi/Stance";
import QuestionCard from "../QuestionCard/QuestionCard";

const QuestionsList = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: questions } = useContractRead({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,
    functionName: "getAllQuestions",
    watch: true,
    cacheTime: 2000,
    onSuccess(data) {
      console.log('getAllQuestions success', data);
    },
    onError(error) {
      console.log("getAllQuestions error", error);
      enqueueSnackbar(`An error occured: ${error.message}`, {
        variant: "error",
      });
    },
  });

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      {questions?.length ?
        questions.map((question, index: number) => (
          <Grid xs={4} spacing={2} key={index}>
            <QuestionCard question={question} id={index} />
          </Grid>
        )) : null}
    </Grid>
  );
};

export default QuestionsList;

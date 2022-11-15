import { useEffect } from "react";
import { useAccount, useContractEvent, useContractRead } from "wagmi";
import config from "../../config";
import StanceAbi from "../../abi/Stance.json";
import QuestionListItem from "./QuestionListItem";

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

  // @ts-ignore
  if (questions?.length) {
    // @ts-ignore
    return questions.map((question, index) => (
      <QuestionListItem question={question} id={index} />
    ));
  }
};

export default QuestionsList;

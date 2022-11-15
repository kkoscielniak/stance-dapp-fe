import { useContractWrite, usePrepareContractWrite } from "wagmi";
import StanceAbi from "../../abi/Stance.json";
import config from "../../config";
import { QuestionType } from "./types/Question";

type Props = {
  id: number;
  question: QuestionType;
};

const QuestionListItem = ({ question, id }: Props) => {
  const { config: contractConfig } = usePrepareContractWrite({
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
  } = useContractWrite(contractConfig);

  const { config: contractConfig2 } = usePrepareContractWrite({
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
  } = useContractWrite(contractConfig2);

  const handlePositiveResponseClick = () => {
    respondPositively?.();
  };

  const handleNegativeResponseClick = () => {
    // await setResponseType(false);
    respondNegatively?.();
  };

  return (
    <>
      <p>
        {question.question} | positive: {question.positiveResponsesCount} |
        negative: {question.negativeResponsesCount}
      </p>
      <button onClick={handlePositiveResponseClick}>+</button>
      <button onClick={handleNegativeResponseClick}>-</button>
    </>
  );
};

export default QuestionListItem;

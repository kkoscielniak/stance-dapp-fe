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

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuestionText(event.currentTarget.value);
  };

  const handleSubmit = () => {
    write?.();
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div style={{ margin: "10px 0" }}>
      <input
        type="text"
        placeholder="ask a question to our community"
        value={questionText}
        onChange={handleInputChange}
      ></input>
      <button onClick={handleSubmit} disabled={!write}>
        submit
      </button>
    </div>
  );
};

export default AskQuestionForm;

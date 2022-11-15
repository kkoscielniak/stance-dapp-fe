import { BigNumber } from "ethers";

export type QuestionType = {
  question: string;
  author: string;
  positiveResponsesCount: number;
  negativeResponsesCount: number;
  timestamp: BigNumber;
}
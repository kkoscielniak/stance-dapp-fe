import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { TransactionReceipt } from "@ethersproject/abstract-provider";
import {
  AbiParametersToPrimitiveTypes,
  ExtractAbiFunctionNames,
  ExtractAbiFunctions,
} from "abitype";
import { StanceArtifact } from "../abi/Stance";
import config from "../config/config";

type AbiFunctions = ExtractAbiFunctions<
  typeof StanceArtifact.abi,
  "nonpayable"
>;

type UseCommonWriteOptions = {
  functionName: ExtractAbiFunctionNames<
    typeof StanceArtifact.abi,
    "nonpayable"
  >;
  args?: AbiParametersToPrimitiveTypes<AbiFunctions["inputs"]>;
  onPrepareError?: (error: Error) => void;
  onWriteError?: (error: Error) => void;
  onWaitError?: (error: Error) => void;
  onWaitSuccess?: (data: TransactionReceipt) => any | undefined;
};

const useCommonWrite = ({
  functionName,
  args,
  onPrepareError,
  onWriteError,
  onWaitError,
  onWaitSuccess,
}: UseCommonWriteOptions) => {
  const {
    config: contractConfig,
    isError: isPrepareError,
    error: prepareError,
  } = usePrepareContractWrite({
    address: config.CONTRACT_ADDRESS,
    abi: StanceArtifact.abi,
    functionName,
    args,
    onError(error) {
      console.warn(`[Prepare] ${functionName} failed: ${error.message}`);
      onPrepareError?.(error);
    },
  });

  const {
    data: transactionData,
    isLoading: isMakingTransaction,
    write,
  } = useContractWrite({
    ...contractConfig,
    onError(error) {
      console.error(`[Write] ${functionName} failed: ${error.message}`);
      onWriteError?.(error);
    },
  });

  const { data: transactionReceipt, isLoading: isProcessingTransaction } =
    useWaitForTransaction({
      hash: transactionData?.hash,
      onSuccess(data) {
        console.log(`[Wait] ${functionName} succeeded: ${data}`);
        onWaitSuccess?.(data);
      },
      onError(error) {
        console.log(`[Wait] ${functionName} failed: ${error.message}`);
        onWaitError?.(error);
      },
    });

  return {
    write,
    transactionData,
    transactionReceipt,
    isMakingTransaction,
    isProcessingTransaction,

    // errors:
    isPrepareError,
    prepareError,
  };
};

export default useCommonWrite;

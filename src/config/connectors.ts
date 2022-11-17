import { configureChains, defaultChains } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { infuraProvider } from "wagmi/providers/infura";
import config from "./config";

const { chains } = configureChains(defaultChains, [
  infuraProvider({ apiKey: config.INFURA_ID! }),
]);

const connectors = [new MetaMaskConnector({ chains })];

export default connectors;

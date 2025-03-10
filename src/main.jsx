import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  bsc,
  bscTestnet,
  cronos,
  fantom,
  gnosis,
  mainnet,
  opBNBTestnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
  zksync,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Replace with your WalletConnect project ID
const projectId = "YOUR_WALLETCONNECT_PROJECT_ID";

// Configure RainbowKit
export const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: projectId, // Required for WalletConnect
  chains: [
    bsc,
    opBNBTestnet,
    polygon,
    bscTestnet,
    mainnet,
    avalanche,
    fantom,
    gnosis,
    arbitrum,
    optimism,
    sepolia,
    polygonMumbai,
    arbitrumGoerli,
    optimismGoerli,
    cronos,
    zksync,
  ],
  ssr: false, // Set to true if using SSR
});

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
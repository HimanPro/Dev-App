import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { arbitrum, arbitrumGoerli, avalanche, bsc, bscTestnet, cronos, fantom, gnosis, mainnet, opBNBTestnet, optimism, optimismGoerli, polygon, polygonMumbai, sepolia, zksync } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  binanceWallet,
  metaMaskWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [trustWallet, metaMaskWallet,tokenPocketWallet, binanceWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);
// import { getDefaultConfig } from "@rainbow-me/rainbowkit";
export const config = getDefaultConfig({
  connectors,

  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [bsc, opBNBTestnet, polygon,bscTestnet, mainnet, avalanche, fantom, gnosis, arbitrum, optimism, sepolia, polygonMumbai, arbitrumGoerli, optimismGoerli, cronos, zksync ],
  ssr: true,
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
import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useEnsName, useDisconnect, useSignTypedData, useChainId } from "wagmi";
import { Button, Modal } from 'antd';
import { fetchBalance } from '@wagmi/core'
import { config } from "../main";
const WalletDetails = () => {
    const { address, isConnected } = useAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { disconnect } = useDisconnect();
    const { signTypedDataAsync } = useSignTypedData();
    const chainId = useChainId(); // Chain ID dynamically fetch hoga



    console.log(address, "address");

    const [verified, setVerified] = useState(false);
    const [signature, setSignature] = useState(null);
    console.log({ chainId })
    // 🟢 Network change hone par verify status reset
    useEffect(() => {
        if (chainId) {
            showModal()
            setVerified(false);
            setSignature(null);
        }
    }, [chainId, isConnected, address]);

    const verifyWallet = async () => {
        if (!isConnected || !address) return;

        console.log("Attempting to verify wallet...");
        console.log("Detected Chain ID:", chainId);

        try {
            // Ensure MetaMask is open and focused
            // await window.ethereum.request({ method: "eth_requestAccounts" });

            // const domain = {
            //     name: "WalletVerification",
            //     version: "1",
            //     chainId: Number(chainId) || 1,
            //     verifyingContract: "0x0000000000000000000000000000000000000000",
            // };

            // const types = {
            //     EIP712Domain: [
            //         { name: "name", type: "string" },
            //         { name: "version", type: "string" },
            //         { name: "chainId", type: "uint256" },
            //         { name: "verifyingContract", type: "address" },
            //     ],
            //     Verification: [
            //         { name: "wallet", type: "address" },
            //         { name: "timestamp", type: "uint256" },
            //     ],
            // };

            // const message = { wallet: address, timestamp: Math.floor(Date.now() / 1000) };

            // console.log("Signing Message:", message);

            // const signedData = await signTypedDataAsync({
            //     domain,
            //     types,
            //     primaryType: "Verification",
            //     message,
            // });

            // console.log("Signature received:", signedData);
            // setSignature(signedData);
            setVerified(true);
        } catch (error) {
            console.error("Signing error:", error);
            setVerified(false);
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const f = async () => {
        try {
            const balance = await fetchBalance(config, {
                address,
            })
            console.log('balance', balance);

        } catch (error) {

        }
    }

    useEffect(() => {
        f();
    }, [address])

    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} style={{ backgroundColor: 'black' }}>
            <div className="flex flex-col items-center p-6 bg-black text-white min-h-screen">
                <h2 className="text-2xl font-bold mb-4">Wallet Details</h2>
                {isConnected ? (
                    <div className=" shadow-md p-4 rounded-lg w-full max-w-md text-center">
                        {!verified ? (
                            <>
                                <p className="text-red-500">❌ Wallet not verified</p>
                                <button
                                    className="mt-4 bg-warning text-white px-4 py-2 rounded hero-button"
                                    onClick={verifyWallet}
                                >
                                    Verify Assets
                                </button>
                            </>
                        ) : (
                            <>
                                <p><strong>Address:</strong> {address}</p>
                                <WalletData address={address} chainId={chainId} />
                                <p className="text-green-500 mt-2">✅ Wallet Verified</p>
                            </>
                        )}

                        <button
                            className="mt-4 bg-danger text-white px-4 py-2 rounded"
                            onClick={() => disconnect()}
                        >
                            Disconnect
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500">Wallet not connected.</p>
                )}
            </div>
        </Modal>

    );
};

// 🔹 WalletData Component (For fetching Network & Balance Details)
const WalletData = ({ address, chainId }) => {
    const { data: balance } = useBalance({ address });
    const { data: ensName } = useEnsName({ address });

    // 🟢 Support for Multiple Networks
    const networkNames = {
        1: "Ethereum Mainnet",
        137: "Polygon Mainnet",
        56: "Binance Smart Chain",
        43114: "Avalanche Mainnet",
        80001: "Mumbai Testnet",
        97: "Binance Testnet",
        42161: "Arbitrum One",
        10: "Optimism Mainnet",
        100: "Gnosis Chain",
        250: "Fantom Opera",
        11155111: "Sepolia Testnet",
        421613: "Arbitrum Goerli Testnet",
        420: "Optimism Goerli Testnet",
        25: "Cronos Mainnet",
        324: "zkSync Era Mainnet"
    };
    

    return (
        <>
            <p><strong>ENS Name:</strong> {ensName || "N/A"}</p>
            <p><strong>Balance:</strong> {balance?.formatted} {balance?.symbol}</p>
            <p><strong>Chain ID:</strong> {chainId}</p>
            <p><strong>Network:</strong> {networkNames[chainId] || "Unknown Network"}</p>
        </>
    );
};

export default WalletDetails;

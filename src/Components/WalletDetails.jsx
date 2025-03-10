import React, { useState, useEffect } from "react";
import { useAccount, useBalance, useEnsName, useDisconnect, useChainId } from "wagmi";
import { Modal } from 'antd';

const WalletDetails = () => {
    const { address, isConnected } = useAccount();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { disconnect } = useDisconnect();
    const chainId = useChainId();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (chainId && isConnected && address) {
            showModal();
            setVerified(false);
        }
    }, [chainId, isConnected, address]);

    const verifyWallet = async () => {
        if (!isConnected || !address) return;

        console.log("Attempting to verify wallet...");
        console.log("Detected Chain ID:", chainId);

        try {
            // Simulate a verification process
            setVerified(true);
        } catch (error) {
            console.error("Verification error:", error);
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

    return (
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className="flex flex-col items-center p-6 bg-black text-white">
                <h2 className="text-2xl font-bold mb-4">Wallet Details</h2>
                {isConnected ? (
                    <div className="shadow-md p-4 rounded-lg w-full max-w-md text-center">
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

const WalletData = ({ address, chainId }) => {
    const { data: balance } = useBalance({ address });
    const { data: ensName } = useEnsName({ address });

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
import React, { useState } from "react";
import Container from "../component/Container.jsx";


function Test() {
    const [walletAvailable, setWalletAvailable] = useState(false);
    const [connected, setConnected] = useState(false);


    const checkWallet = () => {
        if (window.cardano && window.cardano.lace) {
            setWalletAvailable(true);
            console.log("Lace wallet is available");
        } else {
            alert("Lace wallet not found. Please install it.");
        }
    };

    const connectWallet = async () => {
        try {
            const lace = await window.cardano.lace.enable();
            setConnected(true);

            const usedAddresses = await lace.getUsedAddresses();
            const address = usedAddresses[0];

            // Replace with your actual logged-in user ID
            const userId = "ict23075@std.uwu.ac.lk";

            // Send to backend
            await fetch("http://localhost:3000/user/save-wallet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId, address }),
            });

        } catch (err) {
            console.error("User rejected connection", err);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <button onClick={checkWallet}>Check Wallet</button>

            {walletAvailable && !connected && (
                <button onClick={connectWallet} style={{ marginLeft: "1rem" }}>
                    Connect Lace Wallet
                </button>
            )}

            {connected && (
                <div>
                    <p>✅ Wallet Connected!</p>
                </div>
            )}
        </div>
    );
}

export default Test;
import BGanimeted from "../component/BGanimeted.jsx";
import Logo from "../component/Logo.jsx";
import {useEffect, useState} from "react";
import {checkAuth} from "../utils/auth.js";
import {useNavigate} from "react-router-dom";
import Alert from "../component/Alert.jsx";



function ConnectWallet() {

    const [user, setUser] = useState(null);
    const [walletAvailable, setWalletAvailable] = useState(false);
    const [connecting, setConnecting] = useState(false);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [btnClicked, setBtnClicked] = useState(() => { /*window.location.href = "https://www.lace.io/"*/; });
    const [btnText, setBtnText] = useState("");


    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                setUser(res.user);
            } else {
                navigate("/login");
            }
        });


        if (window.cardano && window.cardano.lace) {
            console.log("Lace wallet is available!");
            setWalletAvailable(true);
        } else {
            console.log("Please install Lace wallet.");
            console.log("Lace wallet not found. Please install it.");
            setMessage("Lace wallet not found. Please install it.");
            setStatus(false);
            setBtnClicked(() => () => { setShowAlert(false); window.location.href = "https://www.lace.io/" });
            setBtnText("Install Lace Wallet");
            setShowAlert(true);
        }

    }, []);

    async function connectLaceWallet() {
        if (!window.cardano?.lace) return alert("Lace wallet not found");

        const lace = window.cardano.lace;

        setConnecting(true);

        try {
            const api = await lace.enable();
            const changeAddress = await api.getChangeAddress();
            console.log("Connected address:", changeAddress);





            // Send wallet address to backend
            const response = await fetch('http://localhost:3000/wallet/save-wallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // If you're using token-based auth
                },
                credentials: 'include', // Important for sending cookies



                body: JSON.stringify({ walletAddress: changeAddress, email: user.email }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to save wallet address');
            } else {
                setStatus(true);
                setMessage("Wallet Connected Successfully!");
                setBtnClicked(() => () => {setShowAlert(false); navigate("/dashboard")});
                setBtnText("Go to Dashboard");
                setShowAlert(true);
            }

        } catch (err) {
            console.error("Error:", err);
            setStatus(false);
            setMessage(err.message || "Failed to connect or save wallet.");
            setBtnClicked(() => () => setShowAlert(false));
            setBtnText("Close");
            setShowAlert(true);
        } finally {
            setConnecting(false);
        }
    }



    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <BGanimeted />
            </div>
            <div className="absolute top-4 left-8 z-20">
                <Logo />
            </div>

            <Alert show={showAlert} msg={message} status={status} btnShow={true} btnText={btnText} btnClick={btnClicked} />

            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-8xl font-bold text-white mb-4">{user ? "Hi, " + user.name : "Hi, User"}</h1>

                <p className="text-white text-2xl">Let's Connect Your Wallet and Withdraw Your Medals</p>

                <button
                    disabled={connecting}
                    onClick={connectLaceWallet}
                    className={`mt-4 bg-white text-rose-600 font-bold py-4 px-12 rounded-4xl transition duration-300
                    ${connecting ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-400 hover:text-black cursor-pointer"}`}
                >
                    {connecting ? "Connecting..." : "Connect Your Wallet"}
                </button>
                <a className="mt-4 text-white font-bold hover:underline" href="/dashboard">Skip for now</a>

            </div>

        </div>
    )
}

export default ConnectWallet;
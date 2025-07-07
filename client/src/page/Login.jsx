import { useState, useEffect } from "react";
import Container from "../component/Container.jsx";
import BGanimeted from "../component/BGanimeted.jsx";

import Logo from "../component/Logo.jsx";
import Alert from "../component/Alert.jsx";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../utils/auth.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [btnClicked, setBtnClicked] = useState(null);
    const [btnText, setBtnText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                navigate("/dashboard");
            }
        });
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoading(true);

        const payload = {
            email,
            password
        };

        console.log(payload)
        try {
            const response = await fetch("http://localhost:3000/user/signing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setShowLoading(false);
                setBtnClicked(() => () =>{ setShowAlert(false); window.location.href = "/connect-wallet"; })
                setStatus(true);
                setBtnText("Continue");
                setShowAlert(true);
            } else {
                setMessage(data.message);
                setShowLoading(false);
                setBtnClicked(() => () => { setShowAlert(false); })
                setStatus(false);
                setBtnText("Try Again");
                setShowAlert(true);
            }
        } catch (error) {
                console.error("Error:", error);
                setMessage("Network error. Please try again.");
                setShowLoading(false);
                setStatus(false);
                setBtnClicked(() => () => setShowAlert(false));
                setBtnText("Retry");
                setShowAlert(true);
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <BGanimeted />
            </div>
            <div className="absolute top-4 left-8 z-20">
                <Logo />
            </div>

            <Alert
                msg={message}
                status={status}
                show={showAlert}
                btnShow={true}
                btnClick={btnClicked}
                btnText={btnText} />

            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-8xl font-bold text-white mb-4">LOGIN HERE</h1>

                <div
                    className=" md:scale-125 p-8 mt-10 backdrop-blur-xs rounded-[3rem] flex flex-col items-center justify-center bg-white/25"
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"
                        required
                        className="p-4 rounded-4xl mb-4 w-80 bg-white/75"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        required
                        className="p-4 rounded-4xl mb-4 w-80 bg-white/75"
                    />

                    <button
                        onClick={handleSubmit}
                        type="submit"
                        className="mt-10 bg-rose-600 hover:bg-yellow-400 hover:text-black text-white font-bold py-4 px-20 rounded-4xl transition duration-300 cursor-pointer"
                    >
                        Login
                    </button>
                    <a className="mt-4 text-white font-bold hover:underline cursor-pointer" href="/register">
                        Create an account
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;

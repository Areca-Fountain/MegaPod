import Container from "../component/Container.jsx";
import BGanimeted from "../component/BGanimeted.jsx";
import Logo from "../component/Logo.jsx";
import {useState} from "react";
import Loading from "../component/Loading.jsx";
import Alert from "../component/Alert.jsx";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLoading, setShowLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    const [btnClicked, setBtnClicked] = useState(() => {});
    const [btnText, setBtnText] = useState("");


    const handleSubmit = async (e) => {

        setShowLoading(true);

        e.preventDefault();

        const payload = {
            name,
            email,
            password
        };

        console.log(payload);

        try {
            const response = await fetch("http://localhost:3000/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setShowLoading(false);
                setBtnClicked(() => () =>{ setShowAlert(false); window.location.href = "/login"; })
                setStatus(true);
                setBtnText("LOGIN");
                setShowAlert(true);
            } else {
                setMessage(data.message);
                setShowLoading(false);
                setBtnClicked(() => () => { setShowAlert(false); })
                setStatus(false);
                setBtnText("CLOSE");
                setShowAlert(true);
            }
        } catch (error) {
            console.error("Error:", error);
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

            <Loading showLoading={showLoading} />

            <Alert
                msg={message}
                show={showAlert}
                status={status}
                btnShow={true}
                btnClick={btnClicked}
                btnText={btnText}
            />

            <div className="flex flex-col items-center justify-center h-screen ">
                <h1 className="text-8xl font-bold text-white mb-4 ">REGISTER HERE</h1>

                <div
                    className=" md:scale-125 p-8 mt-14 rounded-[3rem] flex flex-col items-center justify-center bg-white/25 backdrop-blur-xs">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Your Name"
                        className="p-4 rounded-4xl mb-4 w-80 bg-white/75"
                    />
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
                    <button onClick={handleSubmit} className="cursor-pointer mt-10 bg-rose-600 hover:bg-yellow-400 hover:text-black text-white font-bold py-4 px-20 rounded-4xl transition duration-300">
                        Register
                    </button>
                    <a className="mt-4 text-white font-bold hover:underline" href="/login">already have an account</a>
                </div>
            </div>

        </div>
    );
}

export default Register;

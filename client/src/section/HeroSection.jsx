import { useNavigate } from 'react-router-dom';
import BGImage from "../assets/Asset 1.svg";
import { checkAuth } from "../utils/auth";
import {useState} from "react";

export default function HeroSection() {

    const [isUserLogin, setUserLogin] = useState(false);
    const navigate = useNavigate();

    const handleStart = () => {
        checkAuth().then(data => {
            if (data.isLoggedIn) {
                console.log("User is logged in:");
                setUserLogin(true);
                window.location.href = "/connect-wallet";
            } else {
                console.log("Not logged in");
                window.location.href = "/login";
            }
        });
    };

    return (
        <div className=" w-full h-screen" >

            <div className="flex flex-col items-center h-full">
                <div style={{ backgroundImage: `url(${BGImage})` }} className="absolute top-1/2 transform -translate-y-1/2 inset-0 w-full h-full z-0 bg-no-repeat bg-center" />
                <button className="bg-white hover:bg-yellow-400 text-rose-600 font-bold text-2xl
                    py-5 px-12 transition rounded-4xl hover:cursor-pointer z-20 absolute top-7/8   transform -translate-y-1/2"
                        onClick={handleStart}
                >
                    GET STARTED
                </button>
            </div>
        </div>
    );
}
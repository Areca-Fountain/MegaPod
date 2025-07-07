import Logosvg from "../assets/logo.svg";
import {useNavigate} from "react-router-dom";

export default function Logo() {

    const navigate = useNavigate();

    const handleStart = () => {
        navigate('/');
    };

    return (
        <img src={Logosvg} alt="Logo" className="w-20 h-20 cursor-pointer " onClick={handleStart} />
    )
}
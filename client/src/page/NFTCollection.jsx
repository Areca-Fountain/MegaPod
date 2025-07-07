import Container from "../component/Container.jsx";
import Logo from "../component/Logo.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../utils/auth.js";


function NFTCollection() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                setUser(res.user);
            } else {
                navigate("/login");
            }
        });
    }, []);


    return(
        <Container>
            <Logo />
            <div className="mt-20 flex flex-col items-center justify-center">
                <h1 className="text-8xl font-bold text-white mb-4">MY NFT COLLECTION</h1>
                <div className="flex gap-4">
                    <div className="w-[300px] h-[300px] bg-white overflow-hidden rounded-full flex items-center justify-center"></div>
                    <div className="w-[300px] h-[300px] bg-white overflow-hidden rounded-full flex items-center justify-center"></div>
                    <div className="w-[300px] h-[300px] bg-white overflow-hidden rounded-full flex items-center justify-center"></div>
                </div>
                <p className="text-2xl mt-4 text-white">Level 03 Player</p>
                <button className="px-12 py-4 mt-8 bg-white hover:bg-yellow-400 text-rose-600 font-bold cursor-pointer rounded-4xl">Withdraw Now</button>
            </div>
        </Container>
    )
}

export default NFTCollection;
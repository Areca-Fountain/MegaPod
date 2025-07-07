import Container from "../component/Container.jsx";
import Logo from "../component/Logo.jsx";
import {useEffect, useState} from "react";
import {checkAuth} from "../utils/auth.js";
import {useNavigate} from "react-router-dom";


function Dashboard() {
    const [user, setUser] = useState(null);
    const [level, setLevel] = useState(0);
    const navigate = useNavigate();

    // Helper to fetch and set level
    const fetchAndSetLevel = (email) => {
        fetch("http://localhost:3000/user/get-level", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
            .then(r => r.json())
            .then(data => {
                if (data.max_level) setLevel(data.max_level);
                else setLevel(0);
            })
            .catch(() => setLevel(1));
    };

    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                setUser(res.user);
                fetchAndSetLevel(res.user.email);
            } else {
                navigate("/login");
            }
        });
    }, []);

    // Listen for level update event (custom event from QuizPage)
    useEffect(() => {
        const handler = (e) => {
            if (user && user.email) fetchAndSetLevel(user.email);
        };
        window.addEventListener("levelUpdated", handler);
        return () => window.removeEventListener("levelUpdated", handler);
    }, [user]);

    return(
        <Container>
            <Logo />

            <div className="mt-20 flex flex-col items-center justify-center">
                <h1 className="text-8xl font-bold text-white mb-4">YOUR RANK</h1>
                <div className="w-[300px] h-[300px] bg-white overflow-hidden rounded-full flex items-center justify-center"></div>
                <p className="text-2xl mt-4 text-white">Level {level.toString().padStart(2, '0')} Player</p>
                <button onClick={() => navigate("/game")} className="px-12 py-4 mt-8 bg-white hover:bg-yellow-400 text-rose-600 font-bold cursor-pointer rounded-4xl">Start Now</button>
            </div>
        </Container>
    )
}

export default Dashboard;
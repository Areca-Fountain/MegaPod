import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/auth.js";
import Container from "../component/Container.jsx";
import Logo from "../component/Logo.jsx";

function LevelPage() {
    const [completedLevels, setCompletedLevels] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                setUser(res.user);
                fetchCompletedLevels(res.user.email);
            } else {
                navigate("/login");
            }
        });
    }, []);


    const fetchCompletedLevels = (email) => {
        fetch("/api/user/completed-levels", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        })
            .then((res) => res.json())
            .then((data) => {
                setCompletedLevels(data.completedLevels || []);
            })
            .catch((err) => {
                console.error("Failed to fetch completed levels", err);
            });
    };

    const handleLevelClick = (level) => {
        navigate(`/game?level=${level}`);
    };

    return (
        <Container>
            <Logo />
            <div className="text-center text-white mt-10">
                <h1 className="text-4xl font-bold">Level Timeline</h1>
                <div className="mt-10 flex flex-col items-center">
                    {[...Array(10)].map((_, i) => {
                        const level = i + 1;
                        const completed = completedLevels.includes(level);

                        return (
                            <div
                                key={level}
                                className={`w-[300px] border-l-4 pl-6 py-4 mb-6 relative 
                                    ${completed ? "border-green-500 bg-green-100/10" : "border-gray-400 bg-gray-800/40"} 
                                    cursor-pointer rounded-md hover:scale-105 transition`}
                                onClick={() => handleLevelClick(level)}
                            >

                                <div
                                    className={`absolute left-[-10px] top-5 w-4 h-4 rounded-full 
                                        ${completed ? "bg-green-500" : "bg-gray-400"}`}
                                />


                                <h2 className="text-xl font-semibold text-white">
                                    Level {level.toString().padStart(2, "0")}
                                </h2>
                                {completed && (
                                    <p className="text-green-400 text-sm">✔ Completed</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
}

export default LevelPage;
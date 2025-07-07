import { useState, useEffect } from 'react';
import { FaStar} from "react-icons/fa";
import Container from "../component/Container.jsx";
import Question from "../component/Question.jsx";
import StatusBar from "../component/StatusBar.jsx";
import Navbar from "../section/Navbar.jsx";
import { checkAuth } from "../utils/auth.js";

export default function QuizPage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const quizData = [
        {
            question: "What is stored inside each block of the train?",
            options: [
                "A golden ticket",
                "A secret or piece of data",
                "A train engine",
                "A password"
            ]
        },
        {
            question: "Based on the story of blockchain, what is a blockchain as you feel?",
            options: [
                "A video game",
                "A chain of locked treasure chests that hold information",
                "A train full of people",
                "A type of robot"
            ]
        },
        {
            question: "What makes hash codes so useful in blockchain?",
            options: [
                "They help the train go faster",
                "They stop people from changing information secretly",
                "They make the blocks look shiny",
                "They turn the data into pictures"
            ]
        }
    ];

    const answer = [1,1,1]

    const lenthOfQuiz = quizData.length;
    console.log(lenthOfQuiz);

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answers, setAnswers] = useState([]);        
    const [user, setUser] = useState(null);
    const [submitMsg, setSubmitMsg] = useState("");
    const [level, setLevel] = useState(0);

    const fetchAndSetLevel = (email) => {
        fetch("http://localhost:3000/user/get-level", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
            .then(r => r.json())
            .then(data => {
                if (data.max_level)  setLevel(data.max_level) ;
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
                window.location.href = "/login";
            }
        });
    }, []);


    const handleNext = () => {
        if (selected === null) {
            alert("Please select an answer first!");
            return;
        }

        const updatedAnswers = [...answers];
        updatedAnswers[current] = selected;
        setAnswers(updatedAnswers);

        if (current < quizData.length - 1) {
            setCurrent(current + 1);
            setSelected(updatedAnswers[current + 1] ?? null);
        } else {
            console.log("All answers:", updatedAnswers);
            alert("Quiz finished!");
            window.location.href = "/NFTWON";
        }
    };

    const quiz = quizData[current];

    const isAllCorrect = answers.length === answer.length && answers.every((ans, idx) => ans === answer[idx]);

    const submitQuizResult = async () => {
        if (!user) return;
        try {
            const response = await fetch('http://localhost:3000/user/update-level', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: user.email, level: 2 }),
            });
            if (response.ok) {
                setSubmitMsg('Quiz completed! Level updated successfully.');
                // Notify dashboard to refresh level
                window.dispatchEvent(new Event('levelUpdated'));
            } else {
                setSubmitMsg('Failed to update level.');
            }
        } catch (error) {
            setSubmitMsg('Error updating level.');
        }
    };

    useEffect(() => {
        if (isAllCorrect && answers.length === quizData.length) {
            submitQuizResult().then(r =>  console.log(r));
        }
    }, [isAllCorrect, answers]);

    return (
        <Container>

            <Navbar />

            {/* Quiz container */}
            <div className="w-full px-4 lg:px-8 pt-8">

                {/* Header buttons */}
                <div className="flex flex-row justify-between items-center mb-20">
                    <button className="bg-white hover:bg-yellow-400 text-rose-600 font-bold md:text-2xl py-1 px-6 md:px-12 rounded-4xl">
                        Level <span>{current + 1}</span>
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-white hover:bg-yellow-400 text-rose-600 font-bold md:text-2xl py-1 px-6 md:px-12 rounded-4xl"
                    >
                        {current === quizData.length - 1 ? "Finish" : "Let’s Go"}
                    </button>
                </div>

                {/* Question */}
                <Question quiz={quiz} selected={selected} setSelected={setSelected} />

                {/* Status bar */}
                <StatusBar current={current} total={quizData.length} />

            </div>
            {submitMsg && (
                <div className="text-white text-xl font-bold text-center mt-6">{submitMsg}</div>
            )}
        </Container>
    );
}

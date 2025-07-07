import Container from "../component/Container.jsx";
import Navbar from "../section/Navbar.jsx";
import Game01 from "../game/game01/Game01.jsx";
import Page1 from "../game/game01/page1.jsx";
import Page2 from "../game/game01/page2.jsx";
import GameEnd from "../game/game01/end.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkAuth} from "../utils/auth.js";

export default function Game() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    const pages = {
        1: Game01,
        2: Page1,
        3: Page2,
        4: GameEnd
    }

    useEffect(() => {
        checkAuth().then((res) => {
            if (res.isLoggedIn) {
                setUser(res.user);
            } else {
                navigate("/login");
            }
        });
    }, []);

    // Render the component that matches the current page
    const CurrentPageComponent = pages[page] || GameEnd;

    const goNext = () => {
        setPage((prev) => Math.min(prev + 1, Object.keys(pages).length));
    };

    return(
        <Container>
            {page === 1 ? (
                <CurrentPageComponent onSuccess={goNext} />
            ) : page === 2 || page === 3 ? (
                <CurrentPageComponent func={goNext} />
            ) : (
                <CurrentPageComponent next={goNext} />
            )}
        </Container>
    )

}
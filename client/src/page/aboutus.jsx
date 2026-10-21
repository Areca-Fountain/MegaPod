import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "../component/Container.jsx";
import Navbar from "../section/Navbar.jsx";
import TeamCarousel from "../component/TeamCarousel.jsx";

export function Aboutus() {
    const { hash } = useLocation();

    // Scroll to #team / #contact when arriving from the navbar
    useEffect(() => {
        if (!hash) {
            window.scrollTo(0, 0);
            return;
        }
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
    }, [hash]);

    return (
        <Container>
            <Navbar />

            {/* ---------- Team ---------- */}
            <section id="team" className="py-20 scroll-mt-4">
                <h1 className="text-4xl font-semibold text-center mb-4 text-white">Meet Our Team</h1>
                <p className="text-center text-white/80 mb-12 px-4">
                    The people building MegaPod.
                </p>
                <TeamCarousel />
            </section>

            {/* ---------- Contact ---------- */}
            <section id="contact" className="py-20 scroll-mt-4">
                <h2 className="text-4xl font-semibold text-center mb-16 text-white">Contact Us</h2>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                    {/* Phone */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-white text-6xl mb-4">🎧</div>
                        <h3 className="text-white font-semibold tracking-wide uppercase mb-2">By Phone</h3>
                        <p className="text-white mb-6">
                            Get telephone support by signing into your account.
                        </p>
                        <button className="bg-white px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full scale-125 text-red-500">
                            Log In
                        </button>
                    </div>

                    {/* New Case */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-orange-500 text-6xl mb-4">🗂️</div>
                        <h3 className="text-white font-semibold tracking-wide uppercase mb-2">Start a New Case</h3>
                        <p className="text-white mb-6">
                            Just send us your questions or concerns by starting a new case and we will give you the help you need.
                        </p>
                        <button className="bg-white px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full scale-125 text-red-500">
                            Start Here
                        </button>
                    </div>

                    {/* Live Chat */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-orange-500 text-6xl mb-4">💬</div>
                        <h3 className="text-white font-semibold tracking-wide uppercase mb-2">Live Chat</h3>
                        <p className="text-white mb-6">
                            Chat with a member of our in-house team.
                        </p>
                        <button className="bg-white px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full scale-125 text-red-500">
                            Start Chat
                        </button>
                    </div>
                </div>
            </section>
        </Container>
    );
}
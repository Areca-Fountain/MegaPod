import Container from "../component/Container.jsx";
import Navbar from "../section/Navbar.jsx";

export function Aboutus() {

    let f = () => {
        console.log("hello");
    }

    return (
        <Container>
            <Navbar />

            <section className="py-20">
                <h1 className="text-4xl font-semibold text-center mb-16 text-white">Contact Us</h1>

                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
                    {/* Phone */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-white -500 text-6xl mb-4">
                            🎧
                        </div>
                        <h2 className="text-white font-semibold tracking-wide uppercase mb-2">By Phone</h2>
                        <p className="text-white -600 mb-6">
                            Get telephone support by signing into your account.
                        </p>
                        <button className="bg-white border border-gray-400 px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full scale-125 border-none text-red-500 ">
                            Log In
                        </button>
                    </div>

                    {/* New Case */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-orange-500 text-6xl mb-4">
                            🗂️
                        </div>
                        <h2 className="text-white font-semibold tracking-wide uppercase mb-2">Start a New Case</h2>
                        <p className="text-white -600 mb-6">
                            Just send us your questions or concerns by starting a new case and we will give you the help you need.
                        </p>
                        <button className="bg-white border border-gray-400 px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full border-none scale-125 text-red-500">
                            Start Here
                        </button>
                    </div>

                    {/* Live Chat */}
                    <div className="bg-white/25 p-8 rounded-[50px] text-center shadow">
                        <div className="text-orange-500 text-6xl mb-4">
                            💬
                        </div>
                        <h2 className="text-white  font-semibold tracking-wide uppercase mb-2">Live Chat</h2>
                        <p className="text-white -600 mb-6">
                            Chat with a member of our in-house team.
                        </p>
                        <button className="  bg-white border border-gray-400 px-5 py-2 text-sm font-bold hover:bg-gray-100 rounded-full scale-125 border-none text-red-500" >
                            Start Chat
                        </button>
                    </div>
                </div>
            </section>

        </Container>
    );
}

import StatusBar from "../../component/StatusBar.jsx";

function GameEnd() {



    return (


            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-6xl font-bold text-white mb-4 text-center">Congratulations!<br />You Just Build a Blockchain</h1>
                <button
                    className="mt-10 bg-white hover:bg-yellow-400 hover:text-black text-rose-600 cursor-pointer font-bold py-4 px-20 rounded-4xl transition duration-300"
                    onClick={() => { window.location.href = "/quiz"; }}
                >
                    Start Main Quiz
                </button>
                    {/*<StatusBar current={5} total={5} />*/}

            </div>



    )
}

export default GameEnd;
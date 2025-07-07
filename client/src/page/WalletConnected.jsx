import BGanimeted from "../component/BGanimeted.jsx";
import Logo from "../component/Logo.jsx";
import Wallet from "../assets/icons/wallet.svg";


function WalletConnected() {




    return (
        <div className="relative w-screen h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10">
                <BGanimeted />
            </div>
            <div className="absolute top-4 left-8 z-20">
                <Logo />
            </div>
            <div className="absolute scale-75 right-8 z-20">
                <button className="mt-10 bg-white hover:bg-yellow-400 hover:text-black text-rose-600 cursor-pointer font-bold py-4 px-20 rounded-4xl transition duration-300">
                    Continue
                </button>
            </div>


            <div className="flex flex-col items-center justify-center h-screen">
                <div className="flex justify-center items-center mb-12">
                    <img src={Wallet} alt="Wallet" className="w-40 h-40"/>
                </div>

                <p className="text-white text-4xl">Grate Your Wallet is Connected.</p>

                <button className="mt-10 bg-white hover:bg-yellow-400 hover:text-black text-rose-600 cursor-pointer font-bold py-4 px-20 rounded-4xl transition duration-300">
                    Go to Dashboard
                </button>

            </div>

        </div>
    )
}

export default WalletConnected;
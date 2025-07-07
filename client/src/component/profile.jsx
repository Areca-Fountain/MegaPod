import { useState } from "react";

export default function Profile({ name, email }) {
    const [showProfile, setShowProfile] = useState(false);

    const Logout = () => {
        alert("Logout");
        // You can clear session or redirect here
    };

    return (
        <div className="relative bg-white/80 shadow-lg rounded-2xl py-2 px-4 flex items-center gap-4 w-64 cursor-pointer hover:bg-yellow-400 transition-all duration-300">
            <div onClick={() => setShowProfile(!showProfile)} >
                <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">{email}</p>
            </div>

            {showProfile && (
                <div className="absolute top-18 right-0  bg-white/80 shadow-lg rounded-2xl py-2 px-4 flex items-center gap-4 w-64 z-50">
                    <div className="flex flex-col gap-2 w-64">
                        <button
                            onClick={() => { window.location.href = "/dashboard"; }}
                            className="text-red-600 font-bold hover:text-red-600/50 cursor-pointer w-full text-left"
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => { window.location.href = "/connect-wallet"; }}
                            className="text-red-600 font-bold hover:text-red-600/50 cursor-pointer w-full text-left"
                        >
                            Connect Your Wallet
                        </button>
                        <button
                            onClick={() => { window.location.href = "/levels"; }}
                            className="text-red-600 font-bold hover:text-red-600/50 cursor-pointer w-full text-left"
                        >
                            View All Levels
                        </button>
                        <button
                            onClick={() => { window.location.href = "/NFT"; }}
                            className="text-red-600 font-bold hover:text-red-600/50 cursor-pointer w-full text-left"
                        >
                            NFT Collection
                        </button>
                        <button
                            onClick={Logout}
                            className="text-red-600 font-bold hover:text-red-600/50 cursor-pointer w-full text-left"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

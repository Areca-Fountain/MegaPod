import {useEffect, useState} from "react";
import Logo from "../assets/logo.svg?react";
import { useNavigate, Link } from 'react-router-dom';
import { checkAuth } from "../utils/auth";
import Profile from "../component/profile.jsx";



export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserLogin, setUserLogin] = useState(false);
    const [user, setUser] = useState(null);

    const MenuList = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Services", link: "#" },
        { name: "Contact", link: "/about#contact" },
    ];

    useEffect(() => {
        checkAuth().then(data => {
            if (data.isLoggedIn) {
                console.log("User is logged in:", data.user);
                setUserLogin(true);
                setUser(data.user);


            } else {
                console.log("Not logged in");
            }
        });
    }, []);


    const navigate = useNavigate();
    const handleSignUpButton = () => {
        navigate('/register');
    }
    const handleSignInButton = () => {
        navigate('/login');
    }

    return (
        <nav className="relative z-50 mx-auto flex items-center justify-between flex-wrap px-4 lg:px-8 py-4
text-white text-xl font-bold bg-rose-700 rounded-2xl transition duration-300 shadow-lg">

            {/* Logo */}
            <div className="flex items-center">
                <Logo />
            </div>

            {/* Hamburger Icon */}
            <div className="lg:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Menu Items */}
            <div className={`w-full lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col lg:flex-row lg:space-x-6 mt-4 lg:mt-0 ">
                    {MenuList.map((item, index) => (
                        <li key={index} className="mb-2 lg:mb-0 border-white">
                            <Link to={item.link} onClick={() => setIsOpen(false)} className="hover:text-yellow-400 lg:px-2 lg:py-4 lg:border-b transition font-bold hover:cursor-pointer">
                                {item.name}
                            </Link>
                        </li>
                    ))}

                </ul>

                {/* Button */}
                <div className="mt-4 lg:hidden lg:mt-0 lg:ml-4">
                    <button className="hidden bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">
                        Connect Your Wallet
                    </button>
                    <div className={ isUserLogin ? "hidden" : "flex gap-4" } >
                        <button onClick={handleSignUpButton} className="bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">Sign Up</button>
                        <button onClick={handleSignInButton} className="bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">Sign In</button>
                    </div>
                    {isUserLogin && user && (
                        <div className="flex gap-4">
                            <Profile email={user.email} name={user.name} />
                        </div>
                    )}
                </div>
            </div>

            {/* Button */}
            <div className="mt-4 hidden lg:block lg:mt-0 lg:ml-4">
                <button className="hidden bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">
                    Connect Your Wallet
                </button>
                <div className={ isUserLogin ? "hidden" : "flex gap-4" } >
                    <button onClick={handleSignUpButton} className="bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">Sign Up</button>
                    <button onClick={handleSignInButton} className="bg-white text-rose-600 font-bold px-8 py-2 rounded-4xl hover:bg-yellow-300 transition w-full lg:w-auto hover:cursor-pointer">Sign In</button>
                </div>
                {isUserLogin && user && (
                    <div className="flex gap-4">
                        <Profile email={user.email} name={user.name} />
                    </div>
                )}
            </div>
        </nav>
    )
}
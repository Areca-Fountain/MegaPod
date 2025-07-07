import React, { useState } from "react";
import Train from "../../assets/Game01/Train Full.svg";



export default function Page1({func}) {

    const forward = () => {
        alert("Button Clicked!");
    };

    const Back = () => {

    };

    return(
        <div className="h-screen relative">
            <div className="flex items-center justify-center">
               {/* <button onClick={Back} className="w-20 h-20 bg-white text-red-600 hover:bg-yellow-400 transition cursor-pointer font-black text-4xl rounded-bl-2xl rounded-tl-2xl me-2">&lt;</button>*/}
                <h1 className="text-4xl h-20 flex items-center justify-center rounded-l-2xl  font-bold px-16 py-2 bg-white  text-rose-600 w-full text-center">Story Of The Blockchain</h1>
                <button onClick={func} className="w-20 h-20 bg-white text-red-600 hover:bg-yellow-400 transition cursor-pointer font-black text-4xl rounded-br-2xl rounded-tr-2xl ms-2">&gt;</button>
            </div>

            <p className="text-white text-4xl text-center font-bold mt-[50px]">A Blockchain is Like a Train. Each Train Block has a number and secrets hidden</p>

            <img src={Train} alt="" className="mx-10 mt-[50px] scale-75"/>

        </div>
    )
}
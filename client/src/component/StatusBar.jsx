import { FaStar } from "react-icons/fa";

export default function StatusBar({ current, total }) {
    const steps = Array.from({ length: total });

    return (
        <div className="relative w-full h-10 mt-40">

            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-white rounded-full transform -translate-y-1/2" />

            {/* Circles */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 transform -translate-y-1/2 z-10">
                {steps.map((_, i) => (
                    <div
                        key={i}
                        className={`
              w-8 h-8 rounded-full border-[4px] ${current > i ? 'border-amber-400 shadow-[0_0_12px_2px_rgba(255,197,94,1)]' : 'border-white'} relative
              ${i === current ? 'bg-white' : 'bg-rose-600'}
            `}
                    >
                        {i === current && (
                            <span className="text-white text-[14px] w-40 text-center h-auto absolute transform top-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2">
                                You are Here
                            </span>
                        )}
                    </div>
                ))}
            </div>

            {/* Star */}
            <div className="absolute top-[-30px] left-0 right-0 flex justify-end pr-[14px] transform -translate-y-1/2 z-10">
                <FaStar className="text-4xl text-white" />
            </div>
        </div>
    );
}

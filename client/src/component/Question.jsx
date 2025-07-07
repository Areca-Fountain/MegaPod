export default function Question({ quiz, selected, setSelected }) {
    return (
        <div>
            {/* Question */}
            <div className="bg-white text-rose-600 font-bold text-[18px] md:text-2xl py-1 my-12 px-6 md:px-12 rounded-2xl">
                {quiz.question}
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4">
                {quiz.options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => setSelected(index)}
                        className={`
              text-white font-bold text-[18px] md:text-2xl py-1 px-6 md:px-12 rounded-2xl border-2 border-white
              cursor-pointer transition 
              ${selected === index ? 'bg-yellow-400 text-black' : 'hover:bg-white/25'}
            `}
                    >
                        <span>{index + 1})</span>&nbsp;&nbsp;&nbsp;<span>{option}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}


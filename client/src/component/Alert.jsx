function Alert({msg, status, show, btnShow, btnClick, btnText}) {

    if (status === true) {
        return(
            <div className={ ` ${show ? 'block' : 'hidden' } absolute top-0 right-0 bottom-0 left-0 z-50 bg-black/25 backdrop-blur-sm scale-200`}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-green-600 text-2xl font-bold text-center">{msg}</div>

                {btnShow ?  <button className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-black bg-white hover:bg-yellow-400 font-bold text-center w-auto h-auto py-2 px-4 cursor-pointer rounded-4xl" onClick={btnClick}>{btnText}</button>: ''}
            </div>
        )}
    else {
        return(
            <div className={ ` ${show ? 'block' : 'hidden' } absolute top-0 right-0 bottom-0 left-0 z-50 bg-black/50 backdrop-blur-sm scale-200`}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-red-600 text-2xl font-bold text-center">{msg}</div>

                {btnShow ?  <button className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-black bg-white hover:bg-yellow-400 font-bold text-center w-auto h-auto py-2 px-4 cursor-pointer rounded-4xl" onClick={btnClick}>{btnText}</button>: ''}
            </div>
        )
    }
}


export default Alert;


export default function Container({children}) {

    return(
        <div className="bg-linear-65 from-pink-600 to-red-600 min-h-screen w-full px-4 pt-4 sm:px-6 lg:px-10 xl:px-15">

            {children}

        </div>
    )

}

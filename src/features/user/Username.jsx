function Username() {
    return (
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full 
                        bg-gray-100 text-gray-800 shadow-sm
                        hover:bg-gray-200 transition">
            
            {/* Avatar / inicijal */}
            <div className="w-7 h-7 flex items-center justify-center 
                            rounded-full bg-black text-white text-xs font-bold">
                I
            </div>

            {/* Username */}
            <span className="text-sm font-semibold tracking-wide">
                Irfan
            </span>
        </div>
    )
}

export default Username

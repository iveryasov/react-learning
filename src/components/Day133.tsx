import { useState } from "react";

// Day 133
// Interactive profile card with Tailwind
// Learning Tailwind CSS

function Day133() {
    // States:
    const [isAvailable, setIsAvailable] = useState<boolean>(true);

    return (
        <div className="bg-emerald-700 text-white flex flex-col min-h-screen items-center justify-center">
            <h1 className="text-center text-2xl font-semibold">Tailwind CSS Setup Verification</h1>
            
            <div className="bg-amber-800 max-w-sm rounded-lg flex flex-col gap-2 p-6">
                <h2>PROFILE CARD</h2>
                <div>
                    <p>Ivan Developer</p>
                    <p>Role: <span>Frontend Explorer</span></p>
                    <p>Status: <span>{isAvailable ? "🟢 Available for contracts" : "🔴 Busy / Working on project"}</span></p>
                    <div>
                        <p>Tech Stack:
                            <span>React</span>
                            <span>TypeScript</span>
                            <span>Tailwind CSS</span>
                        </p>
                    </div>
                    <button 
                        className={`cursor-pointer transition rounded-lg p-3 border ${
                        isAvailable ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"}`}
                        onClick={() => setIsAvailable((prev) => !prev)}>
                        {isAvailable ? "Mark as Busy" : "Mark as Available"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Day133;
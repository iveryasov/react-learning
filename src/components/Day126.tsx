import { useState, useEffect } from "react";

// Day 126
// Self-destructing security code

function Day126() {
    const CODE_LIFETIME = 45;

    const [timeLeft, setTimeLeft] = useState<number>(CODE_LIFETIME);
    const [isActive, setIsActive] = useState<boolean>(false);
    const securityCode = "849-201";

    const newCode = () => {
        setTimeLeft(CODE_LIFETIME);
        setIsActive(false);
    }
    
    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsActive(false);
                    return 0;
                } else {
                    return prev - 1;
                }
            })
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        document.title = !isActive ? "Safety" : `(${timeLeft}s) enter the code`;
    }, [timeLeft, isActive]);

    return (
        <div>
            <h2>Self-destructing security code</h2>

            <p>🛡️ Verification code: <code>{securityCode}</code></p>
            <p>Time remaining: <output>{String(timeLeft).padStart(2, "0")} sec</output></p>

            <meter min={0} max={CODE_LIFETIME} value={timeLeft} low={15}></meter>

            <p>Status: 
                {timeLeft === 0 ? "🔴 The code is invalid; please request a new one." : 
                isActive ? "🟢 Waiting for input..." : 
                "⏸️ Timer paused"}
            </p>

            <button onClick={() => setIsActive(!isActive)} disabled={timeLeft === 0}>{isActive ? "Pause ⏸️" : "Start ▶️"}</button>
            <button onClick={() => newCode()}>Request a code</button>
            <button onClick={() => setTimeLeft((prev) => prev + 10)} disabled={timeLeft === 0 || timeLeft > 35}>+10 sec</button>
        </div>
    );
}

export default Day126;
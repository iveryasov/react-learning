import { useState, useEffect } from 'react';

// Day 125
// Focus Session Timer

function Day125() {
    const TOTAL_TIME = 60;
    const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        if (!isRunning) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsRunning(false); // time is up - stop the timer
                    return 0;
                }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(intervalId);
    }, [isRunning]);

    useEffect(() => {
        document.title = isRunning ? `(${timeLeft}s) Focus Session!` : 'Focus Timer';
    }, [timeLeft, isRunning]);

    return (
        <div>
            <h2>Focus Session Timer ⏳</h2>
            <time>{String(timeLeft).padStart(2, '0')}</time>
            <progress value={TOTAL_TIME - timeLeft} max={TOTAL_TIME}></progress>
            <p>{timeLeft === 0 ? 'Completed! Take a break 🎉' : 
                isRunning ? 'In progress 🟢' : 
                'Paused ⏸️'}</p>
            <button onClick={() => setIsRunning(!isRunning)} disabled={timeLeft === 0}>{isRunning ? 'Pause ⏸️' : 'Start ▶️'}</button>
            <button onClick={() => {
                    setTimeLeft(TOTAL_TIME);
                    setIsRunning(false);
                }}
            >Reset 🔄</button>
            <button onClick={() => setTimeLeft((prev) => prev + 15)} disabled={timeLeft > 45}>+15 sec ⚡️</button>
        </div>
    );
}

export default Day125;
import { useState, useEffect } from 'react';
import './Day127.css';

// Day 127
// Background service monitoring simulator

function Day127() {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [delay, setDelay] = useState<number>(2000);
    const [pingCount, setPingCount] = useState<number>(0);
    const [latency, setLatency] = useState<number>(35);

    useEffect(() => {
        if (!isActive) return;

        const mainInterval = setInterval(() => {
            setPingCount((prev) => prev + 1);
            setLatency(Math.floor(Math.random() * 60) + 20);
        }, delay);

        return () => clearInterval(mainInterval);
    }, [isActive, delay]);

    // Browser Tab Title
    useEffect(() => {
        document.title = isActive ? `● (${pingCount}) Monitoring...` : "⏸ Paused | Server Monitor";

        return () => {
            document.title = "React Learning";
        };
    }, [pingCount, isActive]);

  return (
    <div>
        <h2>Server Health Monitor (Live Polling)</h2>

        <fieldset>
            <legend>Polling Config</legend>
            <select
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
            >
                <option value="1000">Fast (1s)</option>
                <option value="2000">Normal (2s)</option>
                <option value="5000">Slow (5s)</option>
            </select>
        </fieldset>

        <div>
            {isActive ? (
                <div className="online-block">
                    <span>ONLINE</span>
                </div>
            ) : (
                <div className="paused-block">
                    <span>PAUSED</span>
                </div>
            )}
            <div>
                <samp>{latency}ms</samp>
            </div>
            <div>
                <output>{pingCount}</output>
            </div>

            <div>
                <button onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Resume"}</button>
                <button onClick={() => {
                    setPingCount(0);
                    setLatency(35);
                }}>Reset Counter</button>
            </div>
        </div>
    </div>
  );
}

export default Day127;
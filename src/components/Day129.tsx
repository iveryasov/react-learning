import { useState, useEffect } from "react";

// Day 129
// Window responsiveness inspector

function Day129() {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const [isTracking, setIsTracking] = useState<boolean>(true);

    useEffect(() => {
        if (!isTracking) return;

        const handleResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [isTracking]);

    useEffect(() => {
        document.title = `(${width}px) Viewport`;
    }, [width]);

    return (
        <div>
            <h2>Viewport Breakpoint Inspector</h2>
            <p>Tracking: {isTracking ? "ACTIVE" : "PAUSED"}</p>

            <h3>Screen Dimensions:</h3>
            <output> Width: {width}px | Height: {height}px </output>

            <p>Current Device Target:
                {width < 768 ? "Mobile 📲" : 
                width < 1024 ? "Tablet 📱" : 
                "Desktop 🖥️"}
            </p>

            <button onClick={() => setIsTracking(!isTracking)}>{isTracking ? "Pause Tracking" : "Resume Tracking"}</button>
        </div>
    )
}

export default Day129;
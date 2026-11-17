import { useState, useEffect } from "react";

// Day 141
// Feed monitor with auto-refresh and pause

interface FeedItem {
    id: number;
    title: string;
    body: string;
}

const API_URL = "https://jsonplaceholder.typicode.com/posts?_limit=3";
const BROKEN_API_URL = "https://jsonplaceholder.typicode.com/error-404";

function Day141() {
    const REFRESH_INTERVAL = 10;

    // States:
    const [items, setItems] = useState<FeedItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAutoEnabled, setIsAutoEnabled] = useState<boolean>(true);
    const [secondsLeft, setSecondsLeft] = useState<number>(REFRESH_INTERVAL);
    const [lastUpdated, setLastUpdated] = useState<string>("Never");
    const [useBrokenUrl, setUseBrokenUrl] = useState<boolean>(false);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);

        const url = useBrokenUrl ? BROKEN_API_URL : API_URL;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Server responded with error");
            }

            const data: FeedItem[] = await response.json();

            setItems(data);
            setLastUpdated(new Date().toLocaleTimeString());
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setSecondsLeft(REFRESH_INTERVAL);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!isAutoEnabled) return;

        const interval = setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    fetchData();
                    return REFRESH_INTERVAL;
                } else {
                    return prev - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isAutoEnabled, useBrokenUrl]);

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <div>
            <section>
                <h2>Auto-Refreshing Feed Monitor</h2>
                {error && <p>Error: {error}</p>}
                <p>Status: {!isAutoEnabled ? "⏸ Auto-refresh paused" : `🟢 Live (Updating in ${secondsLeft}s)`}</p>
                <output>Last updated: {lastUpdated}</output>
            </section>

            <section>
                <button onClick={() => setIsAutoEnabled(!isAutoEnabled)}>
                    {!isAutoEnabled ? "Resume" : "Pause"}
                </button>
                <button onClick={() => fetchData()}>Refresh Now</button>
                <button onClick={() => setUseBrokenUrl(!useBrokenUrl)}>Simulate Error</button>
            </section>

            <section>
                {isLoading && items.length === 0 && <p>⏳ Loading feed...</p>}
                {!isLoading && items.length > 0 && (
                    <div>
                        {items.map(post => 
                            <div key={post.id}>
                                <h3>{post.id} - {post.title}</h3>
                                <p>{post.body}</p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}

export default Day141;
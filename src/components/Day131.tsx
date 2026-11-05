import { useState, useEffect } from "react";

// Day 131
// Remote Task Inspector
// Loading data from an external API via useEffect

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";
const BROKEN_API_URL = "https://jsonplaceholder.typicode.com/broken-endpoint-404";

function Day131() {
    // States:
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Triggers for reloading and error simulation:
    const [reloadTrigger, setReloadTrigger] = useState<number>(0);
    const [useBrokenUrl, setUseBrokenUrl] = useState<boolean>(false);

    useEffect(() => {
        const url = useBrokenUrl ? BROKEN_API_URL : API_URL;

        const loadTasks = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data: Task[] = await response.json();

                setTasks(data);
            } catch (err) {
                setTasks([]);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadTasks();
    }, [reloadTrigger, useBrokenUrl]);

    return (
        <div>
            <h2>Remote Task Inspector (API Integration)</h2>

            {isLoading && <p>⏳ Loading data from server...</p>}
            {error && <p>❌ Error: {error}</p>}
            {!isLoading && !error && (
                <div>
                    <h3>TASK LIST CONTAINER</h3>
                    <ul>
                        {tasks.map((task) => 
                            <li key={task.id}>
                                {task.id}. {task.title} - {task.completed ? "Completed ✅" : "Pending ⏳"}
                            </li>
                        )}
                    </ul>
                </div>
            )}

            <p>Total Loaded: {tasks.length} tasks</p>

            <button onClick={() => setReloadTrigger((prev) => prev + 1)}>Reload Tasks</button>
            <button onClick={() => setUseBrokenUrl(!useBrokenUrl)}>Toggle Broken URL (Simulate Error)</button>
        </div>
    )
}

export default Day131;
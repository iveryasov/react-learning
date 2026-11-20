import { useState, useEffect } from "react";

// Day 143
// Live User Search with useDebounce Hook

interface User {
    id: number;
    username: string;
    email: string;
}

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
};

function Day143() {
    // States
    const [search, setSearch] = useState<string>("");
    const [users, setUsers] = useState<User[] | null>(null);
    const [status, setStatus] = useState<string>("Search employee");
    const [apiCalls, setApiCalls] = useState<number>(0);

    // Calling the custom hook
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        if (debouncedSearch.trim().length < 2) {
            setUsers(null);
            setStatus("At least two letters");
            return;
        }

        const loadEmployees = async () => {
            setStatus("Fetching users...");
            setApiCalls(prev => prev + 1);

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(debouncedSearch.trim())}`);

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data: User[] = await response.json();

                if (data.length > 0) {
                    setUsers(data);
                    setStatus("Users loaded");
                } else {
                    setUsers(null);
                    setStatus("No users found");
                }
            } catch (err) {
                setUsers(null);

                if (err instanceof Error) {
                    setStatus(err.message);
                } else {
                    setStatus("Unknown network request error");
                }
            }
        }

        loadEmployees();
    }, [debouncedSearch]);

    return (
        <div>
            <h2>Employee Search Engine</h2>
            <input 
                type="text" 
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <p>Instant Value: {search}</p>
            <p>Debounced Value: {debouncedSearch} (Updated after 500ms pause)</p>
            <p>API Call Count: {apiCalls}</p>
            <p>Status: {status}</p>

            {users && (
                <section>
                    {users.map(user =>
                        <div key={user.id}>
                            <h3>{user.username}</h3>
                            <p>{user.email}</p>
                        </div>
                    )}
                </section>
            )}
        </div>
    )
}

export default Day143;
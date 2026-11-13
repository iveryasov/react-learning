import { useState, useEffect } from "react";

// Day 137
// Employee directory from an external API

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        city: string;
    };
    company: {
        name: string;
    };
}

function Day137() {
    // States:
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [refreshKey, setRefreshKey] = useState<number>(0);

    useEffect(() => {
        const loadUsers = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/users");

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data = await response.json();

                setUsers(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadUsers();
    }, [refreshKey]);

    const filteredSearchQuery = searchQuery.toLowerCase().trim();

    const filteredUsers = users.filter((user) => {
        const matchesData = user.name.toLowerCase().includes(filteredSearchQuery) ||
            user.email.toLowerCase().includes(filteredSearchQuery);
        return matchesData;
    });

    return (
        <div className="text-center p-2">
            <h2 className="mb-2">Team Directory Explorer</h2>

            <input
                className="mb-4"
                placeholder="Search employee..." 
                disabled={isLoading}
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
            />

            <section className="w-full max-w-6xl mx-auto">
                {isLoading && <p>⏳ Loading team directory...</p>}
                {error && (
                    <div>
                        <p>❌ Error: {error}</p>
                        <button 
                            onClick={() => setRefreshKey(prev => prev + 1)} 
                            disabled={isLoading}
                            className="p-2 border rounded-xl bg-blue-200"
                        >
                            🔄 Refresh Directory
                        </button>
                    </div>
                )}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-2 gap-x-4 md:gap-x-10">
                        {filteredUsers.map((user) => 
                            <div
                                key={user.id}
                                className="bg-slate-200 p-2 border rounded-xl"
                            >
                                <h3>{user.name} ({user.username})</h3>
                                <p>Email: {user.email}</p>
                                <p>City: {user.address.city}</p>
                                <p>Company: {user.company.name}</p>
                            </div>
                        )}
                    </div>
                )}
                {!isLoading && !error && filteredUsers.length === 0 && <p>No employees found</p>}
            </section>
        </div>
    )
}

export default Day137;
import { useState, useEffect } from "react";

// Day 149
// Mini User Switcher with abortable useFetch

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

type Id = 1 | 2 | 3;

const useFetch = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        const loadData = async () => {
            setLoading(true);
            setData(null);
            setError(null);

            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const result: T = await response.json();

                setData(result);
            } catch (err) {
                if (controller.signal.aborted) {
                    return;
                }

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};

const Day149 = () => {
    const [selectedUserId, setSelectedUserId] = useState<Id>(1);
    const url = `https://jsonplaceholder.typicode.com/users/${selectedUserId}`;
    const { data, loading, error } = useFetch<User>(url);

    const showStatus = loading || error !== null;

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 antialiased">
            <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">
                Abortable User Fetch
            </h1>

            <section className="w-full max-w-md mb-8 text-center">
                <h2 className="text-lg font-semibold tracking-tight text-zinc-200 mb-4">
                Set user ID
                </h2>
                {[1, 2, 3].map(number => (
                <button
                    key={number}
                    onClick={() => setSelectedUserId(number as Id)}
                    className="mx-1.5 mb-2 px-4 py-2 text-sm font-medium bg-zinc-950 text-white border border-zinc-800 rounded-lg cursor-pointer transition-all duration-200 hover:bg-zinc-900 hover:border-zinc-600 hover:shadow-lg hover:shadow-white/10 active:scale-102"
                >
                    User {number}
                </button>
                ))}
            </section>

            {showStatus && (
                <section className="w-full max-w-md mb-8 text-center">
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-200 mb-2">
                        Status:
                    </h2>
                    {loading && <p className="text-sm text-zinc-400 mb-2">Loading...</p>}
                    {error && <p className="text-sm text-zinc-400 mb-2">Error: {error}</p>}
                </section>
            )}

            {!error && !loading && data && (
                <section className="w-full max-w-md mb-6">
                    <article className="p-6 rounded-xl border border-zinc-800/80 bg-gradient-to-br from-zinc-950 via-blue-950/25 to-zinc-950 shadow-md shadow-blue-950/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-blue-900/40">
                        <h2 className="text-xl font-semibold tracking-tight text-white mb-2">
                        {data.id}. {data.name} - {data.username}
                        </h2>
                        <p className="text-sm text-zinc-400 mb-1">{data.email}</p>
                    </article>
                </section>
            )}
        </div>
    );
};

export default Day149;
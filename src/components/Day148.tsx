import { useState, useEffect } from "react";

// Day 148
// First practice with useFetch

interface User {
    name: string;
    email: string;
};

const useFetch = <T,>(url: string) => {
    // 3 states
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const result: T = await response.json();

                setData(result);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [url]);

    return { data, loading, error };
};

const Day148 = () => {
    // Calling the custom hook
    const { data, loading, error } = useFetch<User>(
        "https://jsonplaceholder.typicode.com/users/1"
    );

    return (
        <div className="mx-auto text-center max-w-2xl px-4 py-8">
            <h1 className="font-semibold text-2xl leading-snug text-slate-900 mb-4">
                First practice with useFetch
            </h1>

            <section>
                <h2 className="font-medium text-xl leading-snug text-slate-900 mb-2">
                    User profile
                </h2>

                {loading && (
                    <p className="text-base leading-relaxed text-slate-800">
                        Loading...
                    </p>
                )}
                {error && (
                    <p className="text-base leading-relaxed text-red-600">
                        Error: {error}
                    </p>
                )}
                {!loading && !error && data && (
                    <div className="
                        mx-auto max-w-xs border border-slate-200 rounded-2xl px-2 py-4
                        hover:scale-103 transition duration-300
                        shadow-sm hover:shadow-lg
                    ">
                        <h3 className="font-normal text-xl leading-snug text-slate-900">
                            {data.name}
                        </h3>
                        <p className="text-base leading-relaxed text-slate-700">
                            {data.email}
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
};

export default Day148;
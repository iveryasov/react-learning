import { useState, useEffect } from "react";

// Day 150
// Dynamic Post Inspector

interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

type Users = 1 | 2 | 3 | 4 | 5;

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

const Day150 = () => {
    const [selectedUser, setSelectedUser] = useState<Users>(1);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const url = `https://jsonplaceholder.typicode.com/posts?userId=${selectedUser}`;

    const { data: posts, loading, error } = useFetch<Post[]>(url);

    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredPosts = posts
        ? posts.filter(post =>
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.body.toLowerCase().includes(normalizedQuery)
        )
        : [];

    const showStatus = loading || error !== null;

    return (
        <div className="min-h-screen bg-white text-gray-900 grid grid-cols-1 place-items-center content-start gap-6 px-4 py-8 sm:px-6 md:py-12 antialiased">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900 text-center">
                Dynamic Post Inspector (Day 150)
            </h1>
            <div className="w-full max-w-2xl bg-sky-50/40 border border-sky-100 rounded-2xl p-4 sm:p-6 shadow-sm shadow-sky-100/60 flex flex-wrap items-center justify-center gap-3">
                <p className="w-full text-center text-sm font-medium text-gray-600 mb-1">
                    Select Author:
                </p>
                {[1, 2, 3, 4, 5].map(num => (
                    <button
                        key={num}
                        onClick={() => setSelectedUser(num as Users)}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-sky-500 text-white font-medium shadow-sm shadow-sky-300/60 ring-2 ring-sky-200/70 transition-all duration-200 cursor-pointer hover:bg-sky-400 hover:shadow-md hover:shadow-sky-300/80 active:scale-95 active:bg-sky-300"
                    >
                        {num}
                    </button>
                ))}
                <input
                    type="text"
                    placeholder="Type to filter posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full mt-2 px-4 py-2.5 text-sm sm:text-base bg-white text-gray-800 placeholder:text-gray-400 border border-sky-200 rounded-full shadow-xs focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all duration-200"
                />
            </div>
            {showStatus && (
                <section className="w-full max-w-2xl grid grid-cols-1 gap-3 text-center">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
                        Status:
                    </h2>
                    {loading && (
                        <p className="px-5 py-3 rounded-xl bg-sky-50 text-sky-700 font-medium border border-sky-200 shadow-md shadow-sky-200/70 animate-pulse">
                            Loading...
                        </p>
                    )}
                    {error && (
                        <p className="px-5 py-3 rounded-xl bg-red-50 text-red-700 font-medium border border-red-200 shadow-md shadow-red-200/70">
                            Error: {error}
                        </p>
                    )}
                </section>
            )}
            {!error && !loading && posts && (
                <section className="w-full max-w-2xl grid grid-cols-1 gap-4">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 text-center">
                        User posts
                    </h2>
                    {filteredPosts.map(post => (
                        <div
                            key={post.id}
                            className="p-4 sm:p-5 bg-white border border-sky-100 rounded-2xl shadow-sm shadow-sky-100/80 transition-all duration-200 hover:border-sky-300 hover:shadow-md hover:shadow-sky-200/70 grid grid-cols-1 gap-2"
                        >
                            <h3 className="text-base sm:text-lg font-medium text-gray-600 leading-snug">
                                {post.id}. {post.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                                {post.body}
                            </p>
                        </div>
                    ))}
                    {filteredPosts.length === 0 && (
                        <p className="text-center text-sm sm:text-base text-gray-500 py-6 bg-sky-50/30 border border-sky-100 rounded-2xl">
                            No posts match your search.
                        </p>
                    )}
                    <p className="text-center text-xs sm:text-sm font-medium text-gray-500 pt-2">
                        Showing {filteredPosts.length} of {posts.length} posts
                    </p>
                </section>
            )}
        </div>
    );
};

export default Day150;
import { useState, useEffect } from "react";

// Day 139
// Live post search with protection from request spam

interface Article {
    id: number;
    title: string;
    body: string;
}

function Day139() {
    // States:
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusText, setStatusText] = useState<string>("Enter at least 3 letters");
    const [requestCount, setRequestCount] = useState<number>(0);

    useEffect(() => {
        if (searchTerm.trim().length < 3) {
            setResults([]);
            setStatusText("Enter at least 3 letters");
            return;
        }

        setStatusText("Waiting for user to stop typing...");

        const timer = setTimeout(async () => {
            setIsLoading(true);
            setStatusText("Searching...");
            setRequestCount(prev => prev + 1);
            
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(searchTerm.trim())}`);
            const data: Article[] = await response.json();

            setResults(data);

            if (data.length === 0) {
                setStatusText("Nothing found");
            } else {
                setStatusText(`Found ${data.length} posts`);
            }

            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);
    
    return (
        <div className="text-center m-2">
            <h2 className="text-2xl font-medium mb-4">Debounced Article Search</h2>

            <input 
                type="text" 
                placeholder="Search posts by keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-xl outline-none bg-slate-100 p-2 mb-4"
            />
            <p>Type at least 3 characters to search</p>

            <p>Status: {statusText}</p>
            <p>Diagnostics: <output> Total API Calls: {requestCount}</output></p>

            {isLoading && <p>⏳ Loading data from server...</p>}
            {results && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
                    {results.map((post) =>
                        <div 
                            key={post.id}
                            className="bg-slate-200 border rounded-xl p-2 shadow-lg"
                        >
                            <p>{post.title} - {post.id}</p>
                            <p>{post.body}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Day139;
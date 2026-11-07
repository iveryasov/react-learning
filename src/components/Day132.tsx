import { useState, useEffect } from "react";

// Day 132
// Fast post switching with request cancellation
// Learning AbortController

interface Post {
    id: number;
    title: string;
    body: string;
}

function Day132() {
    // States:
    const [postId, setPostId] = useState<number>(1);
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [abortLog, setAbortLog] = useState<string>("No aborts triggered yet");

    // Main effect:
    useEffect(() => {
        const controller = new AbortController();
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;

        const loadPosts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data: Post = await response.json();

                setPost(data);
            } catch (err) {
                if (controller.signal.aborted) {
                    setAbortLog(`Request for Post #${postId} was cancelled`);
                    return;
                }

                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Unknown error");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }

        loadPosts();

        return () => controller.abort();
    }, [postId]);
    
    return (
        <div>
            <h2>Fast Post Switcher (AbortController Demo)</h2>

            <section>
                <h3>Select post:</h3>
                <div>
                    {[1, 2, 3, 4].map((id) =>
                        <button onClick={() => setPostId(id)} disabled={postId === id} key={id}>
                            {`Post #${id}`}
                        </button>
                    )}
                </div>
            </section>

            <section>
                <p>Active post ID: {postId}</p>
            </section>

            <section>
                {isLoading && <p>⏳ Fetching post details...</p>}
                {error && <p>❌ Error: {error}</p>}
                {post && !isLoading && (
                    <article>
                        <p>Post #{postId}</p>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                    </article>
                )}
            </section>

            <output>Abort Monitor: {abortLog}</output>
        </div>
    )
}

export default Day132;
import { useState, useEffect } from "react";

// Day 138
// Instant profile view by ID

interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

function Day138() {
    // States:
    const [userId, setUserId] = useState<number>(1);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [abortLog, setAbortLog] = useState<string>("No cancellations yet");

    useEffect(() => {
        if (!Number.isInteger(userId) || userId < 1 || userId > 10) {
            setProfile(null);
            setIsLoading(false);
            setError("ID must be a number from 1 to 10");
            return;
        }

        const controller = new AbortController();
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

        const loadUsers = async () => {
            setIsLoading(true);
            setError(null);
            setProfile(null);

            try {
                const response = await fetch(url, { signal: controller.signal });

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data: UserProfile = await response.json();

                setProfile(data);
            } catch (err) {
                if (controller.signal.aborted) {
                    setAbortLog(`Request for Profile #${userId} was cancelled`);
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

        loadUsers();

        return () => controller.abort();
    }, [userId]);

    return (
        <div>
            <h2>Quick Profile Inspector (AbortController)</h2>

            <section>
                <p>Select user ID:</p>
                <div>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(id => 
                        <button type="button" key={id} onClick={() => setUserId(id)}>
                            {id}
                        </button>
                    )}
                </div>
                <p>Or type ID:</p>
                <div>
                    <input 
                        type="number" 
                        placeholder="Type ID here..."
                        min="1"
                        max="10"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                    />
                </div>
            </section>

            {isLoading && <p>⏳ Loading profile...</p>}
            {error && <p>❌ Error: {error}</p>}
            {profile && !isLoading && (
                <article>
                    <h3>{profile.name}</h3>
                    <p>Email: {profile.email}</p>
                    <p>Phone: {profile.phone}</p>
                    <p>Website: {profile.website}</p>
                </article>
            )}

            <output>Cancellation Log: {abortLog}</output>
        </div>
    )
}

export default Day138;
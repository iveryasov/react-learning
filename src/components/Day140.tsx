import { useState, useEffect } from "react";

// Day 140
// Live username validation with Debounce

interface CheckedUser {
    id: number;
    username: string;
}

function Day140() {
    // States:
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [isChecking, setIsChecking] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("Enter at least 3 characters");
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null); // null = not checked, true = available, false = taken
    const [serverCallCount, setServerCallCount] = useState<number>(0);

    // useEffect with Debounce + try/catch/finally
    useEffect(() => {
        if (usernameInput.trim().length < 3) {
            setStatusMessage("Enter at least 3 characters");
            setIsAvailable(null);
            return;
        }

        setStatusMessage("Waiting for typing to stop...");
        setIsAvailable(null);

        const mainTimer = setTimeout(async () => {
            setIsChecking(true);
            setStatusMessage("⏳ Checking availability...");
            setServerCallCount(prev => prev + 1);

            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(usernameInput.trim())}`);

                if (!response.ok) {
                    throw new Error("Server responded with error");
                }

                const data: CheckedUser[] = await response.json();

                if (data.length > 0) {
                    setIsAvailable(false);
                    setStatusMessage("❌ Username is already taken!");
                } else {
                    setIsAvailable(true);
                    setStatusMessage("✅ Username is available!");
                }
            } catch (err) {
                if (err instanceof Error) {
                    setStatusMessage(err.message);
                } else {
                    setStatusMessage("Unknown error");
                }

                setIsAvailable(null);
            } finally {
                setIsChecking(false);
            }
        }, 600);

        return () => clearTimeout(mainTimer);
    }, [usernameInput]);

    return (
        <div className="grid grid-cols-1 text-center gap-4 my-4">
            <h2 className="text-xl font-semibold">Account Registration: Username Check</h2>

            <section>
                <label htmlFor="usernameInput">Choose Username:</label>
                <input 
                    id="usernameInput" 
                    type="text" 
                    placeholder="Type here..."
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className={`p-1 border rounded-xl outline-none m-2 ${
                        isAvailable === null ? "border-gray-700" :
                        isAvailable ? "border-green-500" :
                        "border-red-500"
                    }`}
                />
            </section>

            <section>
                <p>Status: <span className="font-medium">{statusMessage}</span></p>
                <output>Server calls: <span className="font-medium">{serverCallCount}</span></output>
            </section>

            <div>
                <h3 className="font-bold">SUGGESTED RULES</h3>
                <div>
                    <p>- Minimum 3 characters</p>
                    <p>- Debounce delay: 600ms</p>
                    <p>- Try existing names: "Bret", "Antonette", "Karianne"</p>
                </div>
            </div>

            <button 
                disabled={isChecking || !isAvailable}
                className="p-2 border rounded-xl shadow-lg mx-auto 
                disabled:opacity-50 disabled:cursor-not-allowed
                enabled:active:scale-95 transition ease-in-out duration-200
                enabled:cursor-pointer"
            >
                Register
            </button>
        </div>
    )
}

export default Day140;
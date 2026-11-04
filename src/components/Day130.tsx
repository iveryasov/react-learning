import { useState, useEffect } from "react";

// Day 130
// Syncing workspace statuses between tabs

function Day130() {
    const STORAGE_KEY = "workspace_status";

    // States:
    const [status, setStatus] = useState<string>("Online 🟢");
    const [note, setNote] = useState<string>("Ready to work");
    const [lastSyncTime, setLastSyncTime] = useState<string>("Initial Load");

    // Temporary form states:
    const [inputStatus, setInputStatus] = useState<string>("Online 🟢");
    const [inputNote, setInputNote] = useState<string>("");

    // Implementation algorithm
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData !== null) {
            const parsed = JSON.parse(savedData);

            setStatus(parsed.status);
            setNote(parsed.note);
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === STORAGE_KEY && event.newValue) {
                const updated = JSON.parse(event.newValue);
                setStatus(updated.status);
                setNote(updated.note);
                setLastSyncTime(new Date().toLocaleTimeString());
            }
        }

        window.addEventListener("storage", handleStorageChange);

        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const createData = () => {
        const data = {
            status: inputStatus,
            note: inputNote
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        setStatus(data.status);
        setNote(data.note);
    }

    const clearStorage = () => {
        localStorage.removeItem(STORAGE_KEY);

        setStatus("Online 🟢");
        setNote("Ready to work");

        setInputStatus("Online 🟢");
        setInputNote("");
    }

    return (
        <div>
            <h2>Cross-Tab Workspace Sync</h2>

            <p>Current Status: {status}</p>
            <p>Note: {note}</p>

            <h3>Update Profile</h3>

            <fieldset>
                <legend>Broadcast Status to Other Tabs</legend>

                <div>
                    <label htmlFor="status">Select Status:</label>
                    <select id="status" onChange={(e) => setInputStatus(e.target.value)} value={inputStatus}>
                        <option value="Online 🟢">Online 🟢</option>
                        <option value="In a Meeting 🟡">In a Meeting 🟡</option>
                        <option value="Focus Mode 🟣">Focus Mode 🟣</option>
                        <option value="Offline ⚪">Offline ⚪</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="noteInput">Quick Note:</label>
                    <input type="text" id="noteInput" placeholder="Type your note..." onChange={(e) => setInputNote(e.target.value)} value={inputNote}/>
                </div>
            </fieldset>

            <button onClick={() => createData()}>Broadcast Update</button>
            <button onClick={() => clearStorage()}>Clear Storage</button>

            <p>Sync Log: <output>Last sync: {lastSyncTime}</output></p>
        </div>
    )
}

export default Day130;
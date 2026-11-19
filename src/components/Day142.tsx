import { useState, useEffect } from "react";

// Day 142
// Note editor with Debounce auto-save

function Day142() {
    // States:
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [syncStatus, setSyncStatus] = useState<string>("☁️ All changes saved");
    const [isSyncing, setIsSyncing] = useState<boolean>(false);
    const [syncCount, setSyncCount] = useState<number>(0);
    const [lastSavedTime, setLastSavedTime] = useState<string>("Never");

    useEffect(() => {
        if (title.trim() === "" && content.trim() === "") {
            setSyncStatus("Draft is empty");
            return;
        }

        setSyncStatus("✏️ Typing... (Waiting for 600ms pause)");

        const timer = setTimeout(async () => {
            setIsSyncing(true);
            setSyncStatus("⏳ Syncing to cloud...");

            await new Promise(res => setTimeout(res, 400));

            const time = new Date().toLocaleTimeString();

            setLastSavedTime(time);
            setSyncStatus(`✅ Saved at ${time}`);
            setSyncCount(prev => prev + 1);
            setIsSyncing(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [title, content]);

    const saveNote = async () => {
        setIsSyncing(true);
        setSyncStatus("⏳ Syncing to cloud...");

        await new Promise(res => setTimeout(res, 400));

        const time = new Date().toLocaleTimeString();

        setLastSavedTime(time);
        setSyncStatus(`✅ Saved at ${time}`);
        setSyncCount(prev => prev + 1);
        setIsSyncing(false);
    }

    const clearDraft = () => {
        setTitle("");
        setContent("");
    }

    return (
        <div className="m-2">
            <h2>Cloud Note Editor (Debounced Auto-Save)</h2>

            <section>
                <p>Sync Status: {syncStatus}</p>
                <p>Diagnostics: <output>Total Cloud Syncs: {syncCount}</output></p>
                <p>Is syncing: {isSyncing ? "True" : "False"}</p>
                <p>Last time saved: {lastSavedTime}</p>
            </section>

            <section className="grid grid-cols-1 gap-2">
                <input 
                    type="text"
                    placeholder="Note title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Type your note here"
                    rows={5}
                    maxLength={500}
                    minLength={10}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
            </section>

            <section>
                <button 
                    onClick={saveNote}
                    className="p-2 border rounded-xl"
                >
                    ⚡ Force Save Now 
                </button>
                <button 
                    onClick={clearDraft}
                    className="p-2 border rounded-xl"
                >
                    Clear Draft 
                </button>
            </section>
        </div>
    )
}

export default Day142;
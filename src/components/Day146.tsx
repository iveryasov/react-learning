import { useState, useEffect } from "react";

// Day 146
// Note saved in the browser

const useLocalStorage = <T,>(key: string, initialValue: T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (err) {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (err) {
            console.warn(err);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

const Day146 = () => {
    const [userNote, setUserNote] = useLocalStorage<string>("user-note", "");

    const displayedNote = userNote.length === 0 ? "No note yet" : userNote;

    return (
        <div>
            <h1>My note</h1>
            <input 
                type="text"
                placeholder="Type your note"
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
            />
            <p>Preview: {displayedNote}</p>
        </div>
    )
};

export default Day146;
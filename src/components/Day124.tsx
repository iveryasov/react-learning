import { useState, useEffect } from 'react';

// Day 124
// Note with auto-save to localStorage and live browser tab synchronization
// Learning useEffect

function Day124() {
    const [note, setNote] = useState<string>(() => {
        return localStorage.getItem('user_note') || '';
    });
    const [savedAt, setSavedAt] = useState<string>(() => {
        return localStorage.getItem('note_saved_at') || '';
    });

    useEffect(() => {
        localStorage.setItem('user_note', note);

        const now = new Date().toLocaleTimeString();
        setSavedAt(now);
        localStorage.setItem('note_saved_at', now);

        document.title = note.length > 0 ? `Editing: ${note.slice(0, 10)}...` : 'Notes App';
    }, [note]);

    const handleClear = () => {
        localStorage.removeItem('user_note');
        localStorage.removeItem('note_saved_at');
        setNote('');
        setSavedAt('');
        document.title = 'Notes App';
    }

    return (
        <div>
            <h2>Auto-saving Notes 📝</h2>
            <small>{savedAt ? `Last auto-saved at: ${savedAt} 💾` : 'Not saved yet'}</small>

            <textarea
                onChange={(e) => setNote(e.target.value)}
                value={note}
                placeholder='Type your note here...'
            ></textarea>

            <button onClick={handleClear}>Clear Note 🗑️</button>
        </div>
    );
}

export default Day124;
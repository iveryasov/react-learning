import { useState, useEffect } from "react";

// Day 128
// Topic: Global browser event listeners and their mandatory cleanup
// Quick actions modal via hotkey

function Day128() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [lastKey, setLastKey] = useState<string>("None");
    const [actionStatus, setActionStatus] = useState<string>("Ready");

    // Main useEffect
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            setLastKey(event.key);

            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            } else if ((event.key === "k" || event.key === "K") && !isOpen) {
                setIsOpen(true);
            } else if ((event.key === "s" || event.key === "S") && isOpen) {
                setActionStatus("Changes Saved!");
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

  return (
        <div>
            <h2>Global Keyboard Shortcuts Hub</h2>
            <output>{lastKey}</output>
            <p>Modal status: {isOpen ? "OPEN" : "CLOSED"}</p>
            <button onClick={() => setIsOpen(true)}>Open Shortcuts (Press "k")</button>
            {isOpen && (
                <div className="modal-window">
                    <dialog open>
                        <ul>
                            <li><kbd>Escape</kbd></li>
                            <li><kbd>k</kbd></li>
                            <li><kbd>s</kbd></li>
                        </ul>
                    </dialog>
                </div>
            )}
            <p>{actionStatus}</p>
            <button onClick={() => setIsOpen(false)}>Close window</button>
        </div>
    )
}

export default Day128;
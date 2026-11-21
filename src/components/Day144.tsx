import { useState, useEffect } from "react";

// Day 144
// Live editor with delayed formatting

const useDebounce = <T,>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

const Day144 = () => {
    const [text, setText] = useState<string>("");

    // Calling the custom hook
    const debouncedText = useDebounce(text, 600);

    return (
        <div className="m-2 text-center">
            <h1 className="text-xl font-semibold">Text Transformer with useDebounce</h1>

            <section className="my-2">
                <label htmlFor="textInput">
                    Input text:
                </label>
                <input 
                    type="text"
                    id="textInput"
                    placeholder="Type text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="
                        mx-2 border rounded-xl px-4 py-2 outline-none
                        focus:scale-103 transition-transform
                    "
                />
            </section>

            <section className="my-2">
                <p>String length: {text.length}</p>
                <p>Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}</p>
            </section>

            <section className="my-2">
                <h2>Debounced preview</h2>
                <div>
                    <p>{debouncedText.toLowerCase().replaceAll(" ", "-")}</p>
                    <p>{debouncedText.toUpperCase()}</p>
                </div>
            </section>
        </div>
    )
}

export default Day144;
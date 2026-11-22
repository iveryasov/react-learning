import { useState, useEffect } from "react";

// Day 145
// User preferences keeper

// Custom hook
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
}

const Day145 = () => {
    const [isDark, setIsDark] = useLocalStorage<boolean>("pref_dark_mode", false);
    const [density, setDensity] = useLocalStorage<string>("pref_density", "Normal");

    return (
        <div 
            className={`
                ${isDark ? 
                    "bg-slate-900 text-white" : 
                    "bg-slate-100 text-slate-900"
                }
                ${density === "Compact" ? "p-3" : 
                    density === "Spacious" ? "p-8" : 
                    "p-5"
                }
            `}
        >
            <h1>User Preference Hub (useLocalStorage Demo)</h1>
            <p>Theme: {isDark ? "Dark 🌙" : "Light ☀️"}</p>
            <p>Layout Spacing: {density}</p>

            <button onClick={() => setIsDark(prev => !prev)}>Toggle Dark Mode</button>
            <select onChange={(e) => setDensity(e.target.value)} value={density}>
                <option value="Compact">Compact</option>
                <option value="Normal">Normal</option>
                <option value="Spacious">Spacious</option>
            </select>

            <button onClick={() => {
                setIsDark(false);
                setDensity("Normal");
            }}>
                🔄 Reset to Defaults
            </button>
        </div>
    )
}

export default Day145;
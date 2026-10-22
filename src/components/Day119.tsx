import { useState } from 'react';

// Feature Request Board

interface FeatureRequest {
    id: number,
    title: string,
    isPlanned: boolean
}

function Day119() {
    const [inputText, setInputText] = useState<string>('');
    const [features, setFeatures] = useState<FeatureRequest[]>([]);

    const addFeature = () => {
        const newFeature: FeatureRequest = {
            id: Date.now(),
            title: inputText,
            isPlanned: false
        };
        setFeatures([...features, newFeature]);
        setInputText('');
    }

    const deleteFeature = (id: number) => {
        setFeatures(features.filter((feature) => feature.id !== id));
    }

    const toggleStatus = (id: number) => {
        setFeatures(
            features.map((feature) => 
                feature.id === id ? {...feature, isPlanned: !feature.isPlanned} :
                feature
            )
        );
    }

  return (
    <div>
        <h2>Feature Requests 💡</h2>
        <p>Total suggestions: {features.length}</p>

        <form onSubmit={(e) => { e.preventDefault(); addFeature(); }}>
            <input 
                type='text' 
                placeholder='e.g. Add Dark Mode Support'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">Add ➕</button>
        </form>

        <div>
            {features.map((feature) => (
                <div key={feature.id} className='Card'>
                    <span>{feature.title}</span>
                    {feature.isPlanned === false ? <button onClick={() => toggleStatus(feature.id)}>Review 🟡</button> : 
                    <button onClick={() => toggleStatus(feature.id)}>Planned 🟢</button>}
                    <button onClick={() => deleteFeature(feature.id)}>Delete 🗑️</button>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Day119;
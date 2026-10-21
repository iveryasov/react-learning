import { useState } from 'react';

// Live Comment / Review Box

function Day118() {
  const [text, setText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (isSubmitted === true) {
    return <h3>🎉 Review Published!</h3>
  }

  return (
    <div>
        <h2>Review Box</h2>
        <span>{text.length >= 5 ? 'Ready to send 🟢' : 'Draft 🟡'}</span>

        <textarea 
          value={text}
          placeholder="Write your thoughts..."
          onChange={(e) => setText(e.target.value)}
          maxLength={50}
        ></textarea>

        {text.length < 5 ? <p>Too short (min 5 chars) ⚠️</p> : (
            <button onClick={() => setIsSubmitted(true)}>Publish Review 🚀</button>
        )}

        <button onClick={() => setText('')} disabled={text.length === 0}>Clear 🗑️</button>

        <p>{text.length} / 50</p>
    </div>
  );
}

export default Day118;
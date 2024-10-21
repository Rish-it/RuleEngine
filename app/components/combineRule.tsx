// CombineRules.tsx
"use client";
import { useState } from 'react';

const CombineRules = () => {
    const [rules, setRules] = useState(['']);
    const [response, setResponse] = useState<any>(null); // Use `any` or define a proper type.

    const handleAddRule = () => {
        setRules([...rules, '']);
    };

    const handleRuleChange = (index: number, value: string) => {
        const newRules = [...rules];
        newRules[index] = value;
        setRules(newRules);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/combine-rules', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rules }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="container">
            <h1>Combine Rules</h1>
            <form onSubmit={handleSubmit}>
                {rules.map((rule, index) => (
                    <input
                        key={index}
                        type="text"
                        value={rule}
                        onChange={(e) => handleRuleChange(index, e.target.value)}
                        placeholder="Enter rule string"
                        required
                    />
                ))}
                <button type="button" onClick={handleAddRule}>Add Another Rule</button>
                <button type="submit">Combine Rules</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CombineRules;

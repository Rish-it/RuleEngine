// CreateRule.tsx
"use client";
import { useState } from 'react';

const CreateRule = () => {
    const [ruleString, setRuleString] = useState('');
    const [response, setResponse] = useState<any>(null); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/create-rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rule_string: ruleString }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="container">
            <h1>Create a Rule</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ruleString}
                    onChange={(e) => setRuleString(e.target.value)}
                    placeholder="Enter rule string"
                    required
                />
                <button type="submit">Create Rule</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default CreateRule;

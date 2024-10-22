// CombineRules.tsx
"use client";
import { useState } from 'react';
import { LampContainer } from './ui/lamp';

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
            <div className="max-w-2xl mx-10 my-8 p-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-4">Combine</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {rules.map((rule, index) => (
                        <input
                            key={index}
                            type="text"
                            value={rule}
                            onChange={(e) => handleRuleChange(index, e.target.value)}
                            placeholder="Enter rule string"
                            required
                            className="w-full p-2 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        />
                    ))}
                    <div className= "space-x-2">
                    <button
                        type="button"
                        onClick={handleAddRule}
                        className="w-1/4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-200 mb-2"
                    >
                        Add Another
                    </button>
                    <button
                        type="submit"
                        className="w-1/4 py-2 bg-green-500 text-white rounded-full hover:bg-green-700 transition duration-200"
                    >
                        Combine Rules
                    </button>
                    </div>
                </form>
                {response && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                        <h2 className="text-lg font-semibold text-white">Response:</h2>
                        <pre className="mt-2 text-sm text-gray-300">{JSON.stringify(response, null, 2)}</pre>
                    </div>
                )}
            </div>
    );
};

export default CombineRules;

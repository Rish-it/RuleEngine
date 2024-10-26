"use client";
import { useState } from 'react';
import { LampContainer } from './ui/lamp';

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
        <div className="max-w-md mx-auto my-8 p-6 bg-gray-900 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white mb-4">Create Rule</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={ruleString}
                    onChange={(e) => setRuleString(e.target.value)}
                    placeholder="Enter rule string"
                    required
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
                <button 
                    type="submit" 
                    className="w-full py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
                >
                    Create Rule
                </button>
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

export default CreateRule;

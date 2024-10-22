// EvaluateRules.tsx
"use client";
import { useState } from 'react';
import { LampContainer } from './ui/lamp';

const EvaluateRules = () => {
    const [data, setData] = useState('{"age": 35, "department": "Sales", "salary": 50000, "experience": 4}');
    const [ast, setAST] = useState('{"type": "CombinedRules", "children": [{"type": "Rule", "value": "age > 30", "children": []}, {"type": "Rule", "value": "salary < 60000", "children": []}]}');
    const [response, setResponse] = useState<any>(null); // Use `any` or define a proper type.

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const parsedData = JSON.parse(data);
            const parsedAST = JSON.parse(ast);

            const res = await fetch('/api/evaluate-rule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ast: parsedAST, data: parsedData }), // Constructing the JSON body
            });

            const responseData = await res.json();
            setResponse(responseData);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            setResponse({ error: 'Invalid JSON format' });
        }
    };

    return (
   
            <div className="max-w-2xl mx-10 my-8 p-6 bg-gray-900 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-4">Evaluate</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={ast}
                        onChange={(e) => setAST(e.target.value)}
                        placeholder='{"type": "CombinedRules", "children": [{"type": "Rule", "value": "age > 30", "children": []}, {"type": "Rule", "value": "salary < 60000", "children": []}]}'
                        required
                        className="w-full h-32 p-2 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                    <textarea
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder='{"age": 35, "department": "Sales", "salary": 50000, "experience": 4}'
                        required
                        className="w-full h-32 p-2 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                    <button type="submit" className="w-1/4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
                        Evaluate Rule
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

export default EvaluateRules;

"use client";

import { useState } from 'react';

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
        <div className="container">
            <h1>Evaluate Rule</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={ast}
                    onChange={(e) => setAST(e.target.value)}
                    placeholder='{"type": "CombinedRules", "children": [{"type": "Rule", "value": "age > 30", "children": []}, {"type": "Rule", "value": "salary < 60000", "children": []}]}'
                    required
                />
                <textarea
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    placeholder='{"age": 35, "department": "Sales", "salary": 50000, "experience": 4}'
                    required
                />
                <button type="submit">Evaluate Rule</button>
            </form>
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    );
};

export default EvaluateRules;

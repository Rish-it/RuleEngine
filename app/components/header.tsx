// app/components/Header.tsx
"use client";

import { useEffect, useState } from 'react';

const Header = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    return (
        <header className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
            <img src="/ast.png" alt="App Logo" className="logo" /> {/* Replace with your logo path */}
            <h1 className="app-name">Rule Engine App</h1>
            <button onClick={toggleDarkMode} className="toggle-mode">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </header>
    );
};

export default Header;

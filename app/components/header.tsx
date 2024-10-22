"use client";

import { LampContainer } from "./ui/lamp";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-2 ">
            <img src="ast.png" alt="App Logo" className="h-12" />
            <h1 className="text-lg font-bold text-white">Rule Engine</h1>
        </header>
    );
};

export default Header;

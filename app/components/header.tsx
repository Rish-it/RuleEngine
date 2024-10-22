"use client";

import { LampContainer } from "./ui/lamp";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
                <img src="icon.png" alt="App Logo" className="h-14 w-14 rounded-full " />
                <h1 className="text-2xl font-extrabold text-white tracking-wide">
                    Rule Engine
                </h1>
            </div>
            <nav>
                {/* You can add navigation links or buttons here */}
            </nav>
        </header>
    );
};

export default Header;

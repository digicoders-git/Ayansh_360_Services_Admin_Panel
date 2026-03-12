import { memo } from "react";

const Header = memo(({ toggleSidebar, currentPageTitle }) => {
    return (
        <header
            className="h-16 flex items-center justify-between px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40"
        >
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md text-slate-600 bg-slate-50 border border-slate-200">
                    ☰
                </button>
                <h2 className="font-bold text-lg text-slate-800">{currentPageTitle}</h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Online</span>
                </div>
            </div>
        </header>
    );
});

export default Header;

import { Link } from "react-router-dom";
import { memo } from "react";
import {
    FaSignOutAlt,
    FaTimes,
    FaUserCircle
} from "react-icons/fa";

const SidebarItem = memo(({ route, isActive, onClose }) => {
    const IconComponent = route.icon;

    return (
        <Link
            to={route.path}
            className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
            onClick={onClose}
        >
            <IconComponent
                className={`mr-3 text-lg transition-colors duration-200 ${isActive ? "text-blue-600" : "text-slate-400"
                    }`}
            />
            <span className="font-medium text-sm">{route.name}</span>
        </Link>
    );
});

const Sidebar = ({
    isOpen,
    onClose,
    routes,
    currentPath,
    user,
    logout,
}) => {
    const visibleRoutes = routes.filter((r) => !r.hide);

    const isRouteActive = (route) => {
        if (currentPath === route.path) return true;
        if (route.path !== "/" && currentPath.startsWith(route.path + "/")) return true;
        return false;
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:static lg:inset-0 transition-transform duration-300 ease-in-out w-64 flex flex-col border-r bg-white border-slate-200`}
            >
                <div
                    className="flex items-center justify-between h-16 px-4 border-b border-slate-200"
                >
                    <h1 className="text-xl font-bold text-blue-600">
                        Aayansh Admin
                    </h1>
                    <button onClick={onClose} className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors">
                        <FaTimes />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto py-6">
                    <nav className="px-4 space-y-2">
                        {visibleRoutes.map((route) => (
                            <SidebarItem
                                key={route.path}
                                route={route}
                                isActive={isRouteActive(route)}
                                onClose={onClose}
                            />
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-slate-200">
                    <div className="flex items-center mb-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <FaUserCircle className="text-2xl mr-3 text-blue-600" />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate text-slate-800">
                                {user?.name || "Admin"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                Administrator
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                        <FaSignOutAlt />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default memo(Sidebar);

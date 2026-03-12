import { useState, useMemo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FaTachometerAlt, FaEnvelopeOpenText, FaUsers, FaKey, FaWrench, FaBriefcase, FaHardHat, FaPhone } from "react-icons/fa";

const routes = [
    { path: "/dashboard", name: "Dashboard", icon: FaTachometerAlt },
    { path: "/services", name: "Manage Services", icon: FaWrench },
    { path: "/work", name: "Manage Portfolio", icon: FaBriefcase },
    { path: "/career", name: "Manage Careers", icon: FaHardHat },
    { path: "/clients", name: "Manage Testimonials", icon: FaUsers },
    { path: "/contact", name: "Contact & Enquiries", icon: FaPhone },
    { path: "/enquiries", name: "Manage Enquiry", icon: FaEnvelopeOpenText },
    { path: "/change-password", name: "Change Password", icon: FaKey },
];

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { admin, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const currentPageTitle = useMemo(() => {
        return routes.find((route) => route.path === location.pathname)?.name || "Dashboard";
    }, [location.pathname]);

    const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
    const closeSidebar = useCallback(() => setSidebarOpen(false), []);

    const handleLogout = useCallback(() => {
        logout();
        navigate("/login", { replace: true });
    }, [logout, navigate]);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={closeSidebar}
                routes={routes}
                currentPath={location.pathname}
                user={admin}
                logout={handleLogout}
            />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header toggleSidebar={toggleSidebar} currentPageTitle={currentPageTitle} />
                <main className="flex-1 overflow-y-auto p-4 md:p-8 animate-in fade-in duration-500">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
export { routes };

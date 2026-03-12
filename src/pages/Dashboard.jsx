import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaEnvelope, FaImages, FaArrowUp, FaTachometerAlt, FaBriefcase, FaComments, FaFileAlt } from "react-icons/fa";
import { toast } from "sonner";
import * as api from "../apis/website";

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const response = await api.getDashboardStats();
            setStats(response.data.data);
        } catch (error) {
            toast.error("Failed to fetch dashboard stats");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: "Total Services", value: stats?.services || 0, icon: FaImages, color: "#f59e0b", path: "/services" },
        { title: "Total Projects", value: stats?.projects || 0, icon: FaFileAlt, color: "#3b82f6", path: "/portfolio" },
        { title: "Testimonials", value: stats?.testimonials || 0, icon: FaComments, color: "#8b5cf6", path: "/testimonials" },
        { title: "Job Openings", value: stats?.jobs || 0, icon: FaBriefcase, color: "#10b981", path: "/jobs" },
        { title: "Enquiries Received", value: stats?.enquiries || 0, icon: FaEnvelope, color: "#ef4444", path: "/enquiries" },
        { title: "Contact Form Submissions", value: stats?.contactSubmissions || 0, icon: FaUsers, color: "#06b6d4", path: "/contact" },
    ];

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, Admin!</h1>
                <p className="text-slate-500">Here's what's happening with your website today.</p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-600">Loading dashboard stats...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(stat.path)}
                            className="p-6 rounded-2xl shadow-sm border border-slate-200 bg-white transition-all hover:shadow-md hover:scale-[1.02] cursor-pointer text-left"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: stat.color + '15', color: stat.color }}>
                                    <stat.icon className="text-2xl" />
                                </div>
                            </div>
                            <h3 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">{stat.title}</h3>
                            <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                        </button>
                    ))}
                </div>
            )}

        </div>
    );
};

export default Dashboard;

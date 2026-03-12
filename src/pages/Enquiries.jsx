import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTheme } from "../context/ThemeContext";
import * as api from "../apis/website";

const Enquiries = () => {
    const { themeColors } = useTheme();
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const response = await api.getEnquiries();
            setEnquiries(response.data.data || []);
        } catch (error) {
            toast.error("Failed to fetch enquiries");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteEnquiry = async (id) => {
        const result = await Swal.fire({
            title: "Delete Enquiry?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, Delete!",
            cancelButtonText: "Cancel"
        });

        if (!result.isConfirmed) return;
        
        try {
            setLoading(true);
            await api.deleteEnquiry(id);
            await Swal.fire({
                title: "Deleted!",
                text: "Enquiry deleted successfully.",
                icon: "success",
                confirmButtonColor: "#3b82f6"
            });
            fetchEnquiries();
        } catch (error) {
            await Swal.fire({
                title: "Error!",
                text: "Failed to delete enquiry",
                icon: "error",
                confirmButtonColor: "#3b82f6"
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold" style={{ color: themeColors.text }}>Website Enquiries</h1>
                <button 
                    onClick={fetchEnquiries}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {loading && enquiries.length === 0 ? (
                <div className="text-center py-8">
                    <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="text-slate-600 mt-2">Loading enquiries...</p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border shadow-sm" style={{ borderColor: themeColors.border }}>
                    <table className="w-full">
                        <thead style={{ backgroundColor: themeColors.background }}>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Name</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Email</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Subject</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Date</th>
                                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider" style={{ color: themeColors.textSecondary }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {enquiries.map((enquiry) => (
                                <tr 
                                    key={enquiry._id} 
                                    className="border-b transition-colors hover:bg-slate-50"
                                    style={{ borderColor: themeColors.border }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: themeColors.text }}>{enquiry.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: themeColors.textSecondary }}>{enquiry.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: themeColors.textSecondary }}>{enquiry.phone}</td>
                                    <td className="px-6 py-4 text-sm truncate max-w-xs" style={{ color: themeColors.textSecondary }}>{enquiry.subject}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: themeColors.textSecondary }}>
                                        {new Date(enquiry.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDeleteEnquiry(enquiry._id)}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all text-sm disabled:opacity-50"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {enquiries.length === 0 && (
                        <div className="text-center py-8" style={{ color: themeColors.textSecondary }}>
                            No enquiries yet
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Enquiries;

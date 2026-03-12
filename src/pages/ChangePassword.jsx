import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "sonner";
import { FaLock, FaShieldAlt } from "react-icons/fa";
import { changePassword } from "../apis/auth";

const ChangePassword = () => {
    const { themeColors } = useTheme();
    const { token } = useAuth();
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
            toast.error("Please fill all fields!");
            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        if (formData.oldPassword === formData.newPassword) {
            toast.error("New password cannot be same as old password!");
            return;
        }

        if (!token) {
            toast.error("Authentication token not found. Please login again.");
            return;
        }

        try {
            setLoading(true);
            console.log('Attempting to change password with token:', token);
            const response = await changePassword(formData.oldPassword, formData.newPassword, formData.confirmPassword, token);
            console.log('Password change response:', response);
            toast.success("Password changed successfully!");
            setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            console.error('Password change error:', error);
            const errorMessage = error.response?.data?.message || "Failed to change password";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto space-y-6 animate-in slide-in-from-right-4 duration-500 pt-8">
            <Toaster position="top-right" />
            <div className="text-center mb-10">
                <div className="inline-flex p-4 rounded-2xl bg-red-100 text-red-600 mb-4">
                    <FaShieldAlt className="text-3xl" />
                </div>
                <h1 className="text-2xl font-bold" style={{ color: themeColors.text }}>Security Settings</h1>
                <p style={{ color: themeColors.textSecondary }}>Update your administrative password regularly.</p>
            </div>

            <div className="p-8 rounded-3xl border shadow-xl shadow-gray-200/50" style={{ backgroundColor: themeColors.surface, borderColor: themeColors.border }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: themeColors.text }}>Current Password</label>
                        <input
                            type="password"
                            required
                            disabled={loading}
                            className="w-full p-3 rounded-xl border outline-none focus:ring-2 disabled:opacity-50"
                            style={{ backgroundColor: themeColors.background, color: themeColors.text, borderColor: themeColors.border }}
                            value={formData.oldPassword}
                            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: themeColors.text }}>New Password</label>
                        <input
                            type="password"
                            required
                            disabled={loading}
                            className="w-full p-3 rounded-xl border outline-none focus:ring-2 disabled:opacity-50"
                            style={{ backgroundColor: themeColors.background, color: themeColors.text, borderColor: themeColors.border }}
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2" style={{ color: themeColors.text }}>Confirm New Password</label>
                        <input
                            type="password"
                            required
                            disabled={loading}
                            className="w-full p-3 rounded-xl border outline-none focus:ring-2 disabled:opacity-50"
                            style={{ backgroundColor: themeColors.background, color: themeColors.text, borderColor: themeColors.border }}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl font-bold text-white shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ backgroundColor: themeColors.primary }}
                    >
                        <FaLock className="text-sm" /> {loading ? "Updating..." : "Update Security Credentials"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;

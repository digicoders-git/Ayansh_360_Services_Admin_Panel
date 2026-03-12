import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import * as api from "../apis/website";

const Career = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", location: "", type: "", salary: "" });

  const jobTypes = ["Full Time", "Part Time", "Contract", "Internship"];

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await api.getJobs();
      setJobs(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch jobs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.location || !formData.type || !formData.salary) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await api.updateJob(editingId, formData);
        toast.success("Job updated successfully!");
      } else {
        await api.createJob(formData);
        toast.success("Job added successfully!");
      }
      fetchJobs();
      setFormData({ title: "", location: "", type: "", salary: "" });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save job");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job) => {
    setFormData(job);
    setEditingId(job._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Job?",
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
      await api.deleteJob(id);
      await Swal.fire({
        title: "Deleted!",
        text: "Job deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3b82f6"
      });
      fetchJobs();
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete job",
        icon: "error",
        confirmButtonColor: "#3b82f6"
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Manage Careers</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: "", location: "", type: "", salary: "" });
          }}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all disabled:opacity-50"
        >
          <FaPlus /> Add Job
        </button>
      </div>

      {showForm && (
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{editingId ? "Edit Job" : "Add New Job"}</h2>
          <input
            type="text"
            placeholder="Job Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            disabled={loading}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              disabled={loading}
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              disabled={loading}
            >
              <option value="">Select Type</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Salary Range"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
              disabled={loading}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : editingId ? "Update Job" : "Add Job"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ title: "", location: "", type: "", salary: "" });
              }}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading && !showForm && (
        <div className="text-center py-8">
          <div className="inline-block w-8 h-8 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 mt-2">Loading jobs...</p>
        </div>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                  <span>📍 {job.location}</span>
                  <span>⏱️ {job.type}</span>
                  <span className="text-green-600 font-bold">💰 {job.salary}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(job)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all disabled:opacity-50"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;

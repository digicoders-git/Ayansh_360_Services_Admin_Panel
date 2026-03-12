import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaPlus, FaEdit, FaTrash, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import * as api from "../apis/website";

const Clients = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", text: "", rating: 5 });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await api.getTestimonials();
      setTestimonials(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch testimonials");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name || !formData.role || !formData.text) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await api.updateTestimonial(editingId, formData);
        toast.success("Testimonial updated successfully!");
      } else {
        await api.createTestimonial(formData);
        toast.success("Testimonial added successfully!");
      }
      fetchTestimonials();
      setFormData({ name: "", role: "", text: "", rating: 5 });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save testimonial");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setFormData(testimonial);
    setEditingId(testimonial._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Testimonial?",
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
      await api.deleteTestimonial(id);
      await Swal.fire({
        title: "Deleted!",
        text: "Testimonial deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3b82f6"
      });
      fetchTestimonials();
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete testimonial",
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
        <h1 className="text-3xl font-bold text-slate-800">Manage Testimonials</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ name: "", role: "", text: "", rating: 5 });
          }}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
        >
          <FaPlus /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{editingId ? "Edit Testimonial" : "Add New Testimonial"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              disabled={loading}
            />
            <input
              type="text"
              placeholder="Client Role/Title"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
              disabled={loading}
            />
          </div>
          <textarea
            placeholder="Testimonial Text"
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            rows="4"
            className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 resize-none"
            disabled={loading}
          />
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  disabled={loading}
                  className={`text-2xl transition-all ${star <= formData.rating ? "text-yellow-400" : "text-slate-300"}`}
                >
                  <FaStar />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-purple-600 text-white font-bold hover:bg-purple-700 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : editingId ? "Update Testimonial" : "Add Testimonial"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ name: "", role: "", text: "", rating: 5 });
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
          <div className="inline-block w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 mt-2">Loading testimonials...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial._id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{testimonial.name}</h3>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4 line-clamp-3">{testimonial.text}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(testimonial)}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                <FaEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all disabled:opacity-50"
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;

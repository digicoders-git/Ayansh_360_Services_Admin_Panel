import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaPlus, FaEdit, FaTrash, FaImage } from "react-icons/fa";
import Swal from "sweetalert2";
import * as api from "../apis/website";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", desc: "", image: null });
  const [imagePreview, setImagePreview] = useState(null);
  const imageUrl = import.meta.env.VITE_IMAGE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await api.getServices();
      setServices(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch services");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async () => {
    if (!formData.title || !formData.desc) {
      toast.error("Please fill all fields");
      return;
    }

    if (!editingId && !formData.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await api.updateService(editingId, formData);
        toast.success("Service updated successfully!");
      } else {
        await api.createService(formData);
        toast.success("Service added successfully!");
      }
      fetchServices();
      setFormData({ title: "", desc: "", image: null });
      setImagePreview(null);
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save service");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setFormData({ title: service.title, desc: service.desc, image: null });
    setImagePreview(service.image);
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Service?",
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
      await api.deleteService(id);
      await Swal.fire({
        title: "Deleted!",
        text: "Service deleted successfully.",
        icon: "success",
        confirmButtonColor: "#3b82f6"
      });
      fetchServices();
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to delete service",
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
        <h1 className="text-3xl font-bold text-slate-800">Manage Services</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            setFormData({ title: "", desc: "", image: null });
            setImagePreview(null);
          }}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
        >
          <FaPlus /> Add Service
        </button>
      </div>

      {showForm && (
        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg space-y-4">
          <h2 className="text-2xl font-bold text-slate-800">{editingId ? "Edit Service" : "Add New Service"}</h2>
          <input
            type="text"
            placeholder="Service Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            disabled={loading}
          />
          <textarea
            placeholder="Service Description"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            rows="3"
            className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            disabled={loading}
          />
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              disabled={loading}
            />
          </div>
          {imagePreview && (
            <div className="relative h-40 rounded-lg overflow-hidden border border-slate-200">
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex gap-3">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : editingId ? "Update Service" : "Add Service"}
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ title: "", desc: "", image: null });
                setImagePreview(null);
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
          <div className="inline-block w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-600 mt-2">Loading services...</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="relative h-48 bg-slate-100 overflow-hidden">
              {service.image ? (
                <img src={`${imageUrl}${service.image}`} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <FaImage className="text-4xl" />
                </div>
              )}
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
              <p className="text-slate-600 text-sm line-clamp-2">{service.desc}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-all disabled:opacity-50"
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

export default Services;

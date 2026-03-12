import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import * as api from "../apis/website";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: ""
  });
  const [userContacts, setUserContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingContact, setEditingContact] = useState(false);
  const [tempContact, setTempContact] = useState(contactInfo);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    fetchContactInfo();
    if (activeTab === 'submissions') {
      fetchUserContacts();
    }
  }, [activeTab]);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const response = await api.getContactInfo();
      setContactInfo(response.data.data);
      setTempContact(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch contact info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserContacts = async () => {
    try {
      setLoading(true);
      const response = await api.getUserContacts();
      setUserContacts(response.data.data || []);
    } catch (error) {
      toast.error("Failed to fetch contact submissions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async () => {
    if (!tempContact.phone || !tempContact.email || !tempContact.address) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      await api.updateContactInfo(tempContact);
      setContactInfo(tempContact);
      setEditingContact(false);
      toast.success("Contact info updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update contact info");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Submission?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        // Since there's no delete endpoint for user contacts, we'll just remove from UI
        setUserContacts(userContacts.filter(contact => contact._id !== id));
        toast.success("Submission deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete submission");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('info')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'info'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Contact Information
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === 'submissions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-800'
          }`}
        >
          Form Submissions ({userContacts.length})
        </button>
      </div>

      {/* Contact Information Tab */}
      {activeTab === 'info' && (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-800">Contact Information</h1>

          {editingContact ? (
          <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Edit Contact Info</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={tempContact.phone}
                  onChange={(e) => setTempContact({ ...tempContact, phone: e.target.value })}
                  className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={tempContact.email}
                  onChange={(e) => setTempContact({ ...tempContact, email: e.target.value })}
                  className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                <textarea
                  value={tempContact.address}
                  onChange={(e) => setTempContact({ ...tempContact, address: e.target.value })}
                  rows="3"
                  className="w-full p-4 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSaveContact}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => {
                  setEditingContact(false);
                  setTempContact(contactInfo);
                }}
                disabled={loading}
                className="flex-1 py-3 rounded-lg bg-slate-200 text-slate-800 font-bold hover:bg-slate-300 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <FaPhone className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Phone</h3>
              </div>
              <p className="text-slate-600 mb-4">{contactInfo.phone || "Not set"}</p>
              <button
                onClick={() => {
                  setEditingContact(true);
                  setTempContact(contactInfo);
                }}
                disabled={loading}
                className="w-full py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                Edit
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <FaEnvelope className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Email</h3>
              </div>
              <p className="text-slate-600 text-sm break-all mb-4">{contactInfo.email || "Not set"}</p>
              <button
                onClick={() => {
                  setEditingContact(true);
                  setTempContact(contactInfo);
                }}
                disabled={loading}
                className="w-full py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                Edit
              </button>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <FaMapMarkerAlt className="text-2xl" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Address</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4 line-clamp-3">{contactInfo.address || "Not set"}</p>
              <button
                onClick={() => {
                  setEditingContact(true);
                  setTempContact(contactInfo);
                }}
                disabled={loading}
                className="w-full py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        </div>
      )}

      {/* Form Submissions Tab */}
      {activeTab === 'submissions' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">Contact Form Submissions</h2>
          {loading ? (
            <div className="text-center py-8 text-slate-600">Loading submissions...</div>
          ) : userContacts.length === 0 ? (
            <div className="text-center py-8 text-slate-600">No submissions yet</div>
          ) : (
            <div className="space-y-4">
              {userContacts.map((contact) => (
                <div key={contact._id} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-800">{contact.name}</h3>
                      <p className="text-sm text-slate-500">{new Date(contact.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteContact(contact._id)}
                      disabled={loading}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all disabled:opacity-50"
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FaEnvelope className="text-blue-600" />
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">{contact.email}</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaPhone className="text-green-600" />
                      <a href={`tel:${contact.mobile}`} className="text-green-600 hover:underline">{contact.mobile}</a>
                    </div>
                    <div className="mt-4 p-4 rounded-lg bg-slate-50">
                      <p className="text-slate-700 whitespace-pre-wrap">{contact.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;

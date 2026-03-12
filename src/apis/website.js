import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Services
export const getServices = () => axios.get(`${API_BASE}/services`);
export const createService = (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('desc', data.desc);
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }
  return axios.post(`${API_BASE}/services`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateService = (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('desc', data.desc);
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }
  return axios.put(`${API_BASE}/services/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteService = (id) => axios.delete(`${API_BASE}/services/${id}`);

// Work/Portfolio
export const getProjects = () => axios.get(`${API_BASE}/projects`);
export const createProject = (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('category', data.category);
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }
  return axios.post(`${API_BASE}/projects`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const updateProject = (id, data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('category', data.category);
  if (data.image instanceof File) {
    formData.append('image', data.image);
  }
  return axios.put(`${API_BASE}/projects/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const deleteProject = (id) => axios.delete(`${API_BASE}/projects/${id}`);

// Clients/Testimonials
export const getTestimonials = () => axios.get(`${API_BASE}/testimonials`);
export const createTestimonial = (data) => axios.post(`${API_BASE}/testimonials`, data);
export const updateTestimonial = (id, data) => axios.put(`${API_BASE}/testimonials/${id}`, data);
export const deleteTestimonial = (id) => axios.delete(`${API_BASE}/testimonials/${id}`);

// Careers/Jobs
export const getJobs = () => axios.get(`${API_BASE}/jobs`);
export const createJob = (data) => axios.post(`${API_BASE}/jobs`, data);
export const updateJob = (id, data) => axios.put(`${API_BASE}/jobs/${id}`, data);
export const deleteJob = (id) => axios.delete(`${API_BASE}/jobs/${id}`);

// Contact Info
export const getContactInfo = () => axios.get(`${API_BASE}/contact-info`);
export const updateContactInfo = (data) => axios.put(`${API_BASE}/contact-info`, data);

// Enquiries
export const getEnquiries = () => axios.get(`${API_BASE}/enquiries`);
export const createEnquiry = (data) => axios.post(`${API_BASE}/enquiries`, data);
export const deleteEnquiry = (id) => axios.delete(`${API_BASE}/enquiries/${id}`);

// User Contact Submissions
export const getUserContacts = () => axios.get(`${API_BASE}/user-contact`);
export const createUserContact = (data) => axios.post(`${API_BASE}/user-contact`, data);
export const deleteUserContact = (id) => axios.delete(`${API_BASE}/user-contact/${id}`);

// Dashboard
export const getDashboardStats = () => axios.get(`${API_BASE}/dashboard/stats`);

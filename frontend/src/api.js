import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// 🔐 Auth APIs
export const signup = (data) => API.post('/signup', data);
export const login = (data) =>
  API.post('/login', new URLSearchParams(data), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

// 📚 Assignment APIs
export const createAssignment = (data, token) =>
  API.post('/assignments/', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getAssignments = (token) =>
  API.get('/assignments/', {
    headers: { Authorization: `Bearer ${token}` },
  });

// 📤 Submission APIs
export const submitAssignment = (assignmentId, formData, token) =>
  API.post(`/assignments/${assignmentId}/submit/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

export const getSubmissions = (assignmentId, token) =>
  API.get(`/assignments/${assignmentId}/submissions/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all notes
export const fetchNotes = async () => {
  const response = await api.get('/');
  return response.data;
};

// Create a new note
export const createNote = async (note) => {
  const response = await api.post('/', note);
  return response.data;
};

// Update an existing note (Ensure this is properly exported)
export const updateNote = async (note) => {
  const response = await api.put(`/${note.id}`, note);
  return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

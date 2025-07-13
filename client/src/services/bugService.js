import axios from 'axios';

const API_URL = '/api/bugs';

export const getBugs = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createBug = async (bug) => {
  const res = await axios.post(API_URL, bug);
  return res.data;
};

export const updateBug = async (id, updates) => {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
};

export const deleteBug = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

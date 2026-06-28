import api from "./api";

/**
 * Task API service.
 * Keeping every endpoint call here means components and hooks
 * never construct URLs or touch axios directly — if the API
 * shape changes, this is the only file that needs to change.
 */

/** GET /api/tasks?status=&search= */
export const fetchTasks = async ({ status = "all", search = "" } = {}) => {
  const { data } = await api.get("/tasks", { params: { status, search } });
  return data; // { success, count, stats, data: tasks[] }
};

/** POST /api/tasks */
export const createTask = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data.data;
};

/** PUT /api/tasks/:id */
export const updateTask = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data.data;
};

/** DELETE /api/tasks/:id */
export const deleteTask = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data.data;
};

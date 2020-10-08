import axios from "axios"

let baseURL;


process.env.NODE_ENV === "production"
  ? (baseURL = "/")
  : (baseURL = process.env.REACT_APP_LOCALHOST)
  
baseURL = baseURL + "api/task"
  
const service = axios.create({ withCredentials: true, baseURL })

export const addTaskService = async task => {
  return await service.post("/", task).catch(err => {
      return {message: err.response?.data?.message, status: err?.status}
  })
}
  
export const deleteTaskService = async taskId => {
  return await service.delete(`/delete/${taskId}`).catch(err => {
    return {message: err.response?.data?.message, status: err?.status}
  })
}

export const doneTaskService = async taskId => {
  return await service.put(`/done/${taskId}`).catch(err => {
    return {message: err.response?.data?.message, status: err?.status}
  })
}

import axios from "axios"

const url_backend = process.env.REACT_APP_URL_BACKEND || "http://localhost:3001"
const api = axios.create({
    baseURL: url_backend
})
export default api;
export {url_backend}
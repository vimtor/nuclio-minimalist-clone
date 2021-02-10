import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
})

const fetchLists = async () => {
    const {data} = await api.get('/lists')
    return data
}

const createList = async (body = {}) => {
    const {data} = await api.post('/lists', body)
    return data;
}

const removeList = async (id) => {
    return await api.delete(`/lists/${id}`)
}

const updateList = async (id, body = {}) => {
    const {data} = await api.put(`/lists/${id}`, body)
    return data;
}

const register = async ({email, password}) => {
    const {data} = await api.post('/register', {email, password})
    return data.token;
}

const login = async ({email, password}) => {
    const {data} = await api.post('/login', {email, password})
    return data.token;
}

export default {
    fetchLists,
    register,
    login,
    createList,
    removeList,
    updateList
}



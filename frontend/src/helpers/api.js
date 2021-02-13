import axios from "axios";

import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAd_i7fjM42IsonvXRt90BLb9SwdN3OyjU",
    authDomain: "minmalist-clone.firebaseapp.com",
    projectId: "minmalist-clone",
    storageBucket: "minmalist-clone.appspot.com",
    messagingSenderId: "900533090898",
    appId: "1:900533090898:web:b70dc18f8d3a711e2fbd8b"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

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

const fetchOneList = async (id) => {
    const {data} = await api.get(`/lists/${id}`)
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

const createTask = async (listId, title) => {
    const {data} = await api.post(`/lists/${listId}/tasks`, { title })
    return data
}

const removeTask = async (listId, taskId) => {
    await api.delete(`/lists/${listId}/tasks/${taskId}`)
}

const updateTask = async (listId, taskId, body) => {
    const {data} = await api.put(`/lists/${listId}/tasks/${taskId}`, body)
    return data
}

const register = async ({email, password}) => {
    const {data} = await api.post('/register', {email, password})
    return data.token;
}

const login = async ({email, password}) => {
    const {data} = await api.post('/login', {email, password})
    return data.token;
}

const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
    const token = await result.user.getIdToken()
    const {data} = await api.post('/auth/google', {token})
    return data.token
}

const removeManyTasks = async (listId, filter) => {
  await api.delete(`/lists/${listId}/tasks`, {
      params: filter
  })
}

export default {
    fetchLists,
    register,
    login,
    createList,
    removeList,
    updateList,
    createTask,
    fetchOneList,
    updateTask,
    removeTask,
    removeManyTasks,
    loginWithGoogle
}



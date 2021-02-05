import ky from "ky";

const api = 'http://localhost:3001'

export const register = async ({email, password}) => {
  return ky.post(`${api}/register`, {json: {email, password}}).json()
}

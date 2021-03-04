export const getUserIdFromToken = (token) => {
  return JSON.parse(atob(token.split(".")[1])).id;
};

import api from "./api";

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/login", {
    user: { email, password },
  });
  const accessToken = response.headers.authorization?.split("Bearer ")[1];

  return {
    user: response.data.user,
    accessToken,
  };
};

export const signup = async (email: string, password: string) => {
  const response = await api.post("/users/signup", {
    user: { email, password },
  });

  return response.data;
};

export const logout = async () => {
  await api.delete("/users/logout");
};

export const refreshToken = async () => {
  const response = await api.post("/users/refresh_token");
  const accessToken = response.headers.authorization?.split("Bearer ")[1];

  return accessToken;
};

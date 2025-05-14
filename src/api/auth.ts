import { axiosWithCredentials } from "./Axios";

type Login = { email: string; password: string };

export const login = async ({ email, password }: Login): Promise<any> => {
  const response = await axiosWithCredentials.post("/", { email, password });
  return response.data;
};

export const mockLogin = async ({ email, password }: Login): Promise<any> => {
  await new Promise((res) => setTimeout(res, 1000));

  if (email === "test@test.com" && password === "secure101") {
    return { token: "mock-token", user: { name: "Admin User" } };
  } else {
    const error = new Error("Invalid credentials") as Error & {
      response?: { data: { message: string } };
    };
    error.response = { data: { message: "Invalid email or password" } };
    throw error;
  }
};

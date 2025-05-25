// import { axiosWithCredentials } from "./Axios";
import { axiosWithCredentials } from "./Axios";

type LoginInput = { phone: string; password: string };

interface LoginRes {
  user: User;
  access_token: string;
  token_type: string;
}

interface User {
  id: string;
  name: string;
  email: null;
  phone: string;
  birth_date: null;
  is_verified: boolean;
  role: string;
  avatar_slug: null;
  created_at: string;
  updated_at: string;
}

export const login = async ({
  phone,
  password,
}: LoginInput): Promise<LoginRes> => {
  const response = await axiosWithCredentials.post("/api/auth/login", {
    phone,
    password,
  });
  return response.data;
};

// export const login = async ({
//   phone,
//   password,
// }: Login): Promise<RootObject> => {
//   // if using sanctum, then we will have to get the cookie setup first and then
//   // send our respone to store it there !!

//   console.log("this is login info");
//   console.log(phone);
//   console.log(password);

//   const response = await axios.post(
//     "http://192.168.31.206:8000/api/auth/login",
//     { phone, password }
//   );
//   console.log(response.data);
//   return response.data;
// };

export const getMsg = async (): Promise<any> => {
  const response = await axiosWithCredentials.get("/api/m   se", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  console.log(response);
  return response.data;
};

// export const mockLogin = async ({ email, password }: Login): Promise<any> => {
//   await new Promise((res) => setTimeout(res, 1000));

//   if (email === "test@test.com" && password === "secure101") {
//     return { token: "mock-token", user: { name: "Admin User" } };
//   } else {
//     const error = new Error("Invalid credentials") as Error & {
//       response?: { data: { message: string } };
//     };
//     error.response = { data: { message: "Invalid email or password" } };
//     throw error;
//   }
// };

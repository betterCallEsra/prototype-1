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

// export const getMsg = async (): Promise<any> => {
//   const response = await axiosWithCredentials.get("/api/me", {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//     },
//   });
//   console.log(response);
//   return response.data;
// };

import axios from "axios";

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  headers: {
    Authorization: `Bearer 6921c720-1a0f-4ae4-a080-82e8372b9904`,
    "API-KEY": "af3f0ad7-1f89-44ef-9777-433dd685d7f0",
  },
});

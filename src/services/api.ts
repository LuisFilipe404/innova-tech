import axios from "axios";
import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    "Erro na validação das variáveis de ambiente",
    env.error.format()
  );
  throw new Error("Variáveis de ambiente inválidas");
}

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

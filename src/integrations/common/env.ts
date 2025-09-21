import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  LLM_BASE_URL: z.string().url(),
  LLM_API_KEY: z.string().min(1),
  LLM_MODEL: z.string().min(1),
  OCR_API_KEY: z.string().min(1),
  OCR_MODEL: z.string().min(1),
  STORAGE_ENDPOINT: z.string().url(),
  STORAGE_REGION: z.string().min(1),
  STORAGE_ACCESS_KEY_ID: z.string().min(1),
  STORAGE_SECRET_ACCESS_KEY: z.string().min(1),
  VITE_STORAGE_PATH: z.string().url(),
})

export type Env = z.infer<typeof envSchema>

export const env = envSchema.parse(process.env)

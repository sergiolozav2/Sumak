import { env, type Env } from '../common/env'
import { LLMService } from './llm-service'
import { OCRService } from './ocr-service'

/**
 * Create an LLMService instance using values from the parsed `Env`.
 * This function does not perform any fallbacks — it expects the environment
 * values to be present and valid (the `Env` type guarantees that during parse).
 */
function createLLMService(cfg: Env): LLMService {
  return new LLMService({
    apiKey: cfg.LLM_API_KEY,
    baseUrl: cfg.LLM_BASE_URL,
    model: cfg.LLM_MODEL,
  })
}

/**
 * Create an OCRService instance using values from the parsed `Env`.
 * No fallbacks are performed; pass a validated `Env` object.
 */
function createOCRService(cfg: Env): OCRService {
  return new OCRService({
    apiKey: cfg.OCR_API_KEY,
    model: cfg.OCR_MODEL,
  })
}

export const ServiceFactories = {
  createLLMService: () => createLLMService(env),
  createOCRService: () => createOCRService(env),
}

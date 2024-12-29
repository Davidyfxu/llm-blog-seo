export interface LLMConfig {
  provider: "openai" | "deepseek" | "anthropic" | "custom";
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  baseUrl?: string;
  customHeaders?: Record<string, string>;
}

export interface LLMResponse {
  content: string;
}

export interface LLMProvider {
  generateCompletion(prompt: string): Promise<LLMResponse>;
}

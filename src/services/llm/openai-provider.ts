import OpenAI from "openai";
import { LLMProvider, LLMConfig, LLMResponse } from "./types";

export class OpenAIProvider implements LLMProvider {
  private client: OpenAI;
  private config: LLMConfig;

  constructor(config: LLMConfig) {
    this.config = config;
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
    });
  }

  async generateCompletion(prompt: string): Promise<LLMResponse> {
    const response = await this.client.chat.completions.create({
      model: this.config.model || "gpt-4-turbo-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: this.config.temperature || 1,
      max_tokens: this.config.maxTokens || 8192,
    });

    return {
      content: response.choices[0].message.content || "",
    };
  }
}

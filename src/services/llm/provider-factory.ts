import { LLMConfig, LLMProvider } from "./types";
import { OpenAIProvider } from "./openai-provider";

export class LLMProviderFactory {
  static createProvider(config: LLMConfig): LLMProvider {
    switch (config.provider) {
      case "openai":
        return new OpenAIProvider(config);
      case "deepseek":
        return new OpenAIProvider(config);
      // Add other providers here
      default:
        throw new Error(`Unsupported LLM provider: ${config.provider}`);
    }
  }
}

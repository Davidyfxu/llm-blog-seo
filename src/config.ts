import { LLMConfig } from "./services/llm/types";

export interface LLMBlogSEOConfig {
  llm: LLMConfig;
  tavily: {
    apiKey: string;
    maxResults?: number;
    searchDepth?: "basic" | "advanced";
  };
  defaults?: {
    style?: "formal" | "casual" | "technical";
    targetAudience?: string;
    targetWordCount?: number;
  };
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: LLMBlogSEOConfig;

  private constructor(config: LLMBlogSEOConfig) {
    this.config = {
      ...config,
      openai: {
        model: "gpt-4-turbo-preview",
        temperature: 0.7,
        maxTokens: 4000,
        ...config.openai,
      },
      tavily: {
        maxResults: 5,
        searchDepth: "advanced",
        ...config.tavily,
      },
      defaults: {
        style: "formal",
        targetWordCount: 1500,
        ...config.defaults,
      },
    };
  }

  public static initialize(config: LLMBlogSEOConfig): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager(config);
    }
    return ConfigManager.instance;
  }

  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      throw new Error(
        "ConfigManager not initialized. Call initialize() first."
      );
    }
    return ConfigManager.instance;
  }

  public getConfig(): LLMBlogSEOConfig {
    return this.config;
  }
}

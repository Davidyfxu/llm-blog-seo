import { ConfigManager, LLMBlogSEOConfig } from "./config";
import { BlogGenerator } from "./services/blog-generator";
import { BlogGenerationConfig, BlogPost, SearchResult } from "./types";

export function initialize(config: LLMBlogSEOConfig): BlogGenerator {
  ConfigManager.initialize(config);
  return new BlogGenerator();
}

export {
  BlogGenerator,
  BlogGenerationConfig,
  BlogPost,
  SearchResult,
  LLMBlogSEOConfig,
};

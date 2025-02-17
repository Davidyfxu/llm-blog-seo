import {
  BlogGenerationConfig,
  BlogPost,
  IGenerateBlog,
  SearchResult,
} from "../types";
import { LLMProvider } from "./llm/types";
import { LLMProviderFactory } from "./llm/provider-factory";
import { ConfigManager } from "../config";

export class ContentGenerator {
  private llmProvider: LLMProvider;

  constructor() {
    const config = ConfigManager.getInstance().getConfig();
    this.llmProvider = LLMProviderFactory.createProvider(config.llm);
  }

  async generateBlog(
    config: BlogGenerationConfig,
    searchResults: SearchResult[],
  ): Promise<IGenerateBlog> {
    const context = this.prepareContext(searchResults);
    const outline = await this.generateOutline(config, context);
    const blogPost = await this.generateFullPost(config, outline, context);
    return {
      blogPost,
      searchResults: searchResults.map((r) => ({
        title: r?.title,
        url: r?.url,
        content: r?.content,
      })),
    };
  }

  private prepareContext(searchResults: SearchResult[]): string {
    return searchResults
      .map(
        (result) =>
          `Source: ${result.url}\nTitle: ${result.title}\nContent: ${result.content}\n---`,
      )
      .join("\n");
  }

  private async generateOutline(
    config: BlogGenerationConfig,
    context: string,
  ): Promise<string> {
    const prompt = `
      Create a detailed outline for a blog post about "${config.topic}".
      Target word count: ${config.targetWordCount}
      Style: ${config.style || "formal"}
      Target audience: ${config.targetAudience || "general"}
      
      Use this research context:
      ${context}
    `;

    const response = await this.llmProvider.generateCompletion(prompt);
    return response.content;
  }

  private async generateFullPost(
    config: BlogGenerationConfig,
    outline: string,
    context: string,
  ): Promise<BlogPost> {
    const prompt = `
      Write a detailed blog post following this outline:
      ${outline}
      
      Requirements:
      - Topic: ${config.topic} (Summarize to generate a better title based on the content and Shorten the title less than 70 characters)
      - Target word count: ${config.targetWordCount}
      - Style: ${config.style || "formal"}
      - Target audience: ${config.targetAudience || "general"}
      - Include relevant keywords: ${
        config.keywords?.join(", ") || "natural keywords"
      }
      
      Research context:
      ${context}
      
      Format the response as JSON with the following structure (valid JSON object with one line):
      {
        "title": "Blog post title",
        "content": "Full blog post content",
        "metadata": {
          "wordCount": number,
          "keywords": ["keyword1", "keyword2", ...],
          "references": ["url1", "url2", ...]
        }
      }
    `;

    const response = await this.llmProvider.generateCompletion(prompt);
    return JSON.parse(response.content) as BlogPost;
  }
}

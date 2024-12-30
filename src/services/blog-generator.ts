import { ConfigManager } from "../config";
import { ContentGenerator } from "./content-generator";
import { SearchService } from "./search";
import { BlogGenerationConfig, IGenerateBlog } from "../types";

export class BlogGenerator {
  private searchService: SearchService;
  private contentGenerator: ContentGenerator;

  constructor() {
    const config = ConfigManager.getInstance().getConfig();
    this.searchService = new SearchService(config.tavily.apiKey);
    this.contentGenerator = new ContentGenerator(config.openai.apiKey);
  }

  async generateBlog(config: BlogGenerationConfig): Promise<IGenerateBlog> {
    const searchResults = await this.searchService.searchAndFetch(config.topic);
    return this.contentGenerator.generateBlog(config, searchResults);
  }
}

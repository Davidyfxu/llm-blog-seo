export interface SearchResult {
  url: string;
  content: string;
  title: string;
}

export interface BlogGenerationConfig {
  topic: string;
  targetWordCount: number;
  style?: "formal" | "casual" | "technical";
  targetAudience?: string;
  keywords?: string[];
}

export interface BlogPost {
  title: string;
  content: string;
  metadata: {
    wordCount: number;
    keywords: string[];
    references: string[];
  };
}
export interface IGenerateBlog {
  blogPost: BlogPost;
  searchResults: SearchResult[];
}

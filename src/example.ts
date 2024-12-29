import { initialize, BlogGenerationConfig } from "./index";
import * as process from "process";

async function main() {
  // Initialize the package with configuration
  const generator = initialize({
    llm: {
      provider: "deepseek",
      apiKey:
        process.env.OPENAI_API_KEY || "sk-ab2569eb717b4f63ab0fe9bc8c1c0d3b",
      // Optional: override default model or other settings
      model: "deepseek-chat",
      baseUrl: "https://api.deepseek.com/v1",
    },
    tavily: {
      apiKey:
        process.env.TAVILY_API_KEY || "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",
      // Optional: customize search settings
      maxResults: 5,
    },
    // Optional: set default values
    defaults: {
      style: "technical",
      targetWordCount: 2000,
    },
  });

  const config: BlogGenerationConfig = {
    topic: "What is the most popular LLM news in the world?",
    targetWordCount: 1500,
    style: "technical",
    targetAudience: "healthcare professionals",
    keywords: [
      "AI in healthcare",
      "medical diagnosis",
      "healthcare automation",
    ],
  };

  try {
    const blogPost = await generator.generateBlog(config);
    console.log("Blog post generated:", blogPost);
  } catch (error) {
    console.error("Error generating blog:", error);
  }
}

main();

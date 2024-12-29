import { tavily } from "@tavily/core";

export class SearchService {
  private tvly: any;

  constructor(apiKey: string) {
    this.tvly = tavily({ apiKey: apiKey });
  }

  async searchAndFetch(query: string): Promise<Record<string, any>> {
    // Use Tavily search
    const { images = [], results = [] } = await this.tvly.search(query, {
      includeImages: true,
      includeImageDescriptions: true,
    });

    const urls = results
      .map((result: any) => result?.url)
      .filter((r: string) => r);

    // Fetch and parse page content in parallel
    const { results: extractResults = [] } = await this.tvly.extract(urls);

    // Create an object to store merged results
    const combinedResults: Record<string, any> = {};

    // Store results objects into combinedResults
    results.forEach((result: any) => {
      if (result.url) {
        combinedResults[result.url] = result;
      }
    });

    // Iterate through extractResults and merge objects with same URL
    extractResults.forEach((extractResult: any) => {
      if (extractResult.url && combinedResults[extractResult.url]) {
        // Merge objects
        combinedResults[extractResult.url] = {
          ...combinedResults[extractResult.url],
          ...extractResult,
        };
      }
    });

    // Return the merged objects array
    return Object.values(combinedResults);
  }
}

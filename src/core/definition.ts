export const TOOL_NAME = "searchWeb";

export const TOOL_DEFINITION = {
  type: "function" as const,
  name: TOOL_NAME,
  description:
    "Search the web using Exa API for high-quality, relevant results",
  parameters: {
    type: "object" as const,
    properties: {
      query: {
        type: "string",
        description: "The search query to find relevant web content",
      },
      numResults: {
        type: "number",
        description: "Number of results to return (default: 5, max: 10)",
        minimum: 1,
        maximum: 10,
      },
      includeText: {
        type: "boolean",
        description:
          "Whether to include page text content in results (default: true)",
      },
      fetchHighlights: {
        type: "boolean",
        description:
          "Whether to include query-relevant highlights from the content",
      },
      includeDomains: {
        type: "array",
        description: "Only search within these domains",
        items: { type: "string" },
      },
      excludeDomains: {
        type: "array",
        description: "Exclude results from these domains",
        items: { type: "string" },
      },
      startPublishedDate: {
        type: "string",
        description:
          "Only include results published after this date (ISO format: 2025-01-01)",
      },
      endPublishedDate: {
        type: "string",
        description:
          "Only include results published before this date (ISO format: 2025-01-01)",
      },
    },
    required: ["query"],
  },
};

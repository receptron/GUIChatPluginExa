import type { ToolSample } from "gui-chat-protocol";

export const samples: ToolSample[] = [
  {
    name: "AI News",
    args: {
      query: "latest artificial intelligence news 2025",
      numResults: 5,
    },
  },
  {
    name: "Programming Tutorial",
    args: {
      query: "TypeScript best practices tutorial",
      numResults: 3,
      includeText: true,
    },
  },
];

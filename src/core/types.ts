import type { ToolResult } from "gui-chat-protocol";

export interface ExaSearchResult {
  title: string;
  url: string;
  text?: string;
  highlights?: string[];
  publishedDate?: string;
  author?: string;
  score?: number;
}

export interface ExaJsonData {
  query: string;
  results: ExaSearchResult[];
}

export type ExaResult = ToolResult<never, ExaJsonData>;

export interface ExaArgs {
  query: string;
  numResults?: number;
  includeText?: boolean;
  fetchHighlights?: boolean;
  includeDomains?: string[];
  excludeDomains?: string[];
  startPublishedDate?: string;
  endPublishedDate?: string;
}

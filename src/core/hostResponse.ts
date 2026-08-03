import type { ExaSearchResult } from "./types";

export interface ExaSearchResponse {
  success: boolean;
  results?: ExaSearchResult[];
  error?: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isOptionalString = (value: unknown): value is string | undefined =>
  value === undefined || typeof value === "string";

const isOptionalNumber = (value: unknown): value is number | undefined =>
  value === undefined || typeof value === "number";

const isOptionalStringArray = (value: unknown): value is string[] | undefined =>
  value === undefined ||
  (Array.isArray(value) && value.every((item) => typeof item === "string"));

const isExaSearchResult = (value: unknown): value is ExaSearchResult =>
  isRecord(value) &&
  typeof value.title === "string" &&
  typeof value.url === "string" &&
  isOptionalString(value.text) &&
  isOptionalStringArray(value.highlights) &&
  isOptionalString(value.publishedDate) &&
  isOptionalString(value.author) &&
  isOptionalNumber(value.score);

export const isExaSearchResponse = (
  value: unknown,
): value is ExaSearchResponse =>
  isRecord(value) &&
  typeof value.success === "boolean" &&
  isOptionalString(value.error) &&
  (value.results === undefined ||
    (Array.isArray(value.results) && value.results.every(isExaSearchResult)));

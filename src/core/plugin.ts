import type { ToolContext, ToolPluginCore } from "gui-chat-protocol";
import type { ExaArgs, ExaResult } from "./types";
import { TOOL_NAME, TOOL_DEFINITION } from "./definition";

export const searchExa = async (
  context: ToolContext,
  args: ExaArgs,
): Promise<ExaResult> => {
  const { query } = args;

  if (!context.app?.searchExa) {
    return {
      message: "searchExa function not available",
      instructions:
        "Acknowledge that the search failed due to a technical error.",
    };
  }

  try {
    const data = await context.app.searchExa(args);

    if (data.success && data.results) {
      return {
        message: `Found ${data.results.length} relevant results for "${query}"`,
        jsonData: { query, results: data.results },
        instructions:
          "Acknowledge that the search was successful and provide a very short summary, focusing only on the most relevant information.",
      };
    } else {
      return {
        message: data.error || "Exa search failed",
        instructions:
          "Acknowledge that the search failed and suggest trying a different query.",
      };
    }
  } catch (error) {
    return {
      message: `Exa search failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      instructions:
        "Acknowledge that the search failed due to a technical error.",
    };
  }
};

export const pluginCore: ToolPluginCore<never, import("./types").ExaJsonData, ExaArgs> = {
  toolDefinition: TOOL_DEFINITION,
  execute: searchExa,
  generatingMessage: "Searching the web...",
  waitingMessage: "Tell the user that you are searching for relevant information.",
  isEnabled: (startResponse) => !!startResponse?.hasExaApiKey,
  delayAfterExecution: 3000,
  backends: ["search"],
};

export { TOOL_NAME, TOOL_DEFINITION };
export const executeExa = searchExa;

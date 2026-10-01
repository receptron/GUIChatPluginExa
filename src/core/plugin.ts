import type { ToolContext, ToolPluginCore } from "gui-chat-protocol";
import type { ExaArgs, ExaResult } from "./types";
import { isExaSearchResponse } from "./hostResponse";
import { TOOL_NAME, TOOL_DEFINITION } from "./definition";

/** After a search that found results. */
export const SEARCH_DONE_INSTRUCTIONS =
  "Use what the search found for what the user asked. If you are in the middle of something that needs it (more searches, slides, a document, a chart), go straight on with it, without saying that the search succeeded or summarizing the results first. Otherwise, give a very short summary of the most relevant information.";

// context is nullable on purpose: hosts that run the plugin without client-side
// state (MulmoClaude's server bridge) pass an empty or missing context, and
// reading through it unguarded threw a TypeError instead of returning a result.
export const searchExa = async (
  context: ToolContext | null | undefined,
  args: ExaArgs,
): Promise<ExaResult> => {
  const { query } = args;

  if (!context?.app?.searchExa) {
    return {
      message: "searchExa function not available",
      instructions:
        "Acknowledge that the search failed due to a technical error.",
    };
  }

  try {
    const data = await context.app.searchExa(args);

    if (!isExaSearchResponse(data)) {
      return {
        message: "searchExa returned an unrecognized response",
        instructions:
          "Acknowledge that the search failed due to a technical error.",
      };
    }

    if (data.success && data.results) {
      return {
        message: `Found ${data.results.length} relevant results for "${query}"`,
        jsonData: { query, results: data.results },
        // The results feed what the model is doing more often than they are
        // the answer: asked for an analysis with slides, voice models
        // searched three or four times, and "acknowledge … provide a very
        // short summary" after each made a turn of its own, between the
        // searches and the slides, and once a slide ("Search was
        // successful. Key takeaways: …").
        instructions: SEARCH_DONE_INSTRUCTIONS,
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

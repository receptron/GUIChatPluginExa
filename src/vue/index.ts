import "../style.css";

import type { ToolPlugin } from "gui-chat-protocol/vue";
import type { ExaJsonData, ExaArgs } from "../core/types";
import { pluginCore } from "../core/plugin";
import { samples } from "../core/samples";
import View from "./View.vue";
import Preview from "./Preview.vue";

export const plugin: ToolPlugin<never, ExaJsonData, ExaArgs> = {
  ...pluginCore,
  viewComponent: View,
  previewComponent: Preview,
  samples,
};

export type { ExaSearchResult, ExaJsonData, ExaArgs, ExaResult } from "../core/types";

export {
  TOOL_NAME,
  TOOL_DEFINITION,
  executeExa,
  pluginCore,
} from "../core/plugin";

export { samples } from "../core/samples";

export { View, Preview };

export default { plugin };

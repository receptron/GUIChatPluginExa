# @gui-chat-plugin/exa

Exa web search plugin for GUI Chat applications. Search the web using Exa API for high-quality, relevant results.

## Features

- High-quality web search via Exa API
- Text content and highlights extraction
- Domain filtering (include/exclude)
- Date range filtering
- Result count configuration

## Installation

```bash
yarn add @gui-chat-plugin/exa
```

## Usage

### Vue Integration

```typescript
// In src/tools/index.ts
import ExaPlugin from "@gui-chat-plugin/exa/vue";

const pluginList = [
  // ... other plugins
  ExaPlugin,
];

// In src/main.ts
import "@gui-chat-plugin/exa/style.css";
```

### Core-only Usage

```typescript
import { executeExa, TOOL_DEFINITION } from "@gui-chat-plugin/exa";

// Search the web
const result = await executeExa(context, {
  query: "TypeScript best practices 2025",
  numResults: 5,
  includeText: true,
});
```

## API

### ExaArgs

```typescript
interface ExaArgs {
  query: string;
  numResults?: number;         // 1-10, default: 5
  includeText?: boolean;       // Include page content
  fetchHighlights?: boolean;   // Include relevant snippets
  includeDomains?: string[];   // Only search these domains
  excludeDomains?: string[];   // Exclude these domains
  startPublishedDate?: string; // ISO date format
  endPublishedDate?: string;   // ISO date format
}
```

### ExaSearchResult

```typescript
interface ExaSearchResult {
  title: string;
  url: string;
  text?: string;
  highlights?: string[];
  publishedDate?: string;
  author?: string;
  score?: number;
}
```

## Configuration

The plugin requires an Exa API key. Configure it via `hasExaApiKey` in your app's start response.

## Development

```bash
# Install dependencies
yarn install

# Run demo
yarn dev

# Build
yarn build

# Lint
yarn lint
```

## License

MIT

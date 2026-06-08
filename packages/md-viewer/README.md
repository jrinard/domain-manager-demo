# @spacedock/md-viewer

Shared Markdown rendering with GitHub Flavored Markdown (`remark-gfm`) and Mermaid fenced code blocks.

## Dependencies

Link the workspace package and install peers in the app (e.g. `tryyb`):

```bash
pnpm add "@spacedock/md-viewer@workspace:*" "react-markdown@^10" remark-gfm mermaid -F tryyb
```

The `@spacedock/md-viewer` package declares `react-markdown` and `remark-gfm` as dependencies; the app should include `mermaid` (peer dependency) and a compatible `react-markdown` so Vite can prebundle them.

## Usage

```tsx
import { MarkdownViewer } from '@spacedock/md-viewer'

;<MarkdownViewer value="# Hello **world**" className="prose" />
```

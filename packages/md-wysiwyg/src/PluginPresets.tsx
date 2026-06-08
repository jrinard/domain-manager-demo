import {
  KitchenSinkToolbar,
  AdmonitionDirectiveDescriptor,
} from '@mdxeditor/editor'

import { MermaidCodeBlockEditorDescriptor } from './MermaidCodeBlockEditor'
import * as Plugins from './Plugins'
import * as ToolbarComponents from './ToolbarComponents'

export const ALL_PLUGINS = [
  Plugins.toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  Plugins.listsPlugin(),
  Plugins.quotePlugin(),
  Plugins.headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  Plugins.linkPlugin(),
  Plugins.linkDialogPlugin(),
  Plugins.imagePlugin({
    imageAutocompleteSuggestions: [
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    imageUploadHandler: async () =>
      Promise.resolve('https://picsum.photos/200/300'),
  }),
  Plugins.tablePlugin(),
  Plugins.thematicBreakPlugin(),
  Plugins.frontmatterPlugin(),
  Plugins.codeBlockPlugin({
    defaultCodeBlockLanguage: '',
    codeBlockEditorDescriptors: [MermaidCodeBlockEditorDescriptor],
  }),
  Plugins.codeMirrorPlugin({
    codeBlockLanguages: {
      mermaid: 'Mermaid',
      mmd: 'Mermaid',
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Plain Text',
      tsx: 'TypeScript',
      md: 'Markdown',
      '': 'Unspecified',
    },
  }),
  Plugins.directivesPlugin({
    directiveDescriptors: [AdmonitionDirectiveDescriptor],
  }),
  Plugins.diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  Plugins.markdownShortcutPlugin(),
]

export const TEXT_ONLY_PLUGINS = [
  Plugins.toolbarPlugin({
    toolbarContents: () => (
      <>
        <ToolbarComponents.UndoRedo />
        <ToolbarComponents.BoldItalicUnderlineToggles />
        <ToolbarComponents.StrikeThroughSupSubToggles options={['Strikethrough']} />
        <ToolbarComponents.CreateLink />
        <ToolbarComponents.BlockTypeSelect />
        <ToolbarComponents.InsertThematicBreak />
        <ToolbarComponents.InsertTable />
        <ToolbarComponents.ListsToggle />
      </>
    ),
  }),
  Plugins.listsPlugin(),
  Plugins.quotePlugin(),
  Plugins.headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  Plugins.linkPlugin(),
  Plugins.linkDialogPlugin(),
  Plugins.tablePlugin(),
  Plugins.thematicBreakPlugin(),
  Plugins.frontmatterPlugin(),
  Plugins.codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
  Plugins.codeMirrorPlugin({
    codeBlockLanguages: {
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Plain Text',
      tsx: 'TypeScript',
      '': 'Unspecified',
    },
  }),
  Plugins.markdownShortcutPlugin(),
]

export const READONLY__ALL_PLUGINS = ALL_PLUGINS.slice(1)
export const READONLY__TEXT_ONLY_PLUGINS = TEXT_ONLY_PLUGINS.slice(1)

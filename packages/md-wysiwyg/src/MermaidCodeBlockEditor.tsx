import { useCallback, useEffect, useState } from 'react'
import {
  type CodeBlockEditorDescriptor,
  type CodeBlockEditorProps,
  useCodeBlockEditorContext,
} from '@mdxeditor/editor'
import { MermaidBlock } from '@spacedock/md-viewer'

function MermaidSplitEditor({ code: initialCode }: CodeBlockEditorProps) {
  const { setCode } = useCodeBlockEditorContext()
  const [text, setText] = useState(initialCode)

  useEffect(() => {
    setText(initialCode)
  }, [initialCode])

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const next = e.target.value
      setText(next)
      setCode(next)
    },
    [setCode],
  )

  return (
    <div
      style={{ display: 'flex', gap: 8, width: '100%', alignItems: 'stretch' }}
      onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      <textarea
        value={text}
        onChange={onChange}
        style={{
          flex: 1,
          minHeight: 140,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 13,
        }}
        spellCheck={false}
        aria-label="Mermaid source"
      />
      <div
        style={{
          flex: 1,
          minHeight: 140,
          overflow: 'auto',
          borderLeft: '1px solid var(--accentBase, #ccc)',
          paddingLeft: 8,
        }}
      >
        <MermaidBlock code={text} />
      </div>
    </div>
  )
}

/** Higher than the default CodeMirror descriptor so mermaid fences use this UI. */
export const MermaidCodeBlockEditorDescriptor: CodeBlockEditorDescriptor = {
  priority: 100,
  match: (language) => language === 'mermaid' || language === 'mmd',
  Editor: MermaidSplitEditor,
}

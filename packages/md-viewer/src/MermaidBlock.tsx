import { useEffect, useState } from 'react'
import mermaid from 'mermaid'

let mermaidConfigured = false

function ensureMermaidConfigured() {
  if (mermaidConfigured) return
  mermaid.initialize({ startOnLoad: false, theme: 'default' })
  mermaidConfigured = true
}

function nextMermaidId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `mermaid-${crypto.randomUUID()}`
  }
  return `mermaid-${Math.random().toString(36).slice(2)}`
}

export type MermaidBlockProps = {
  code: string
  className?: string
}

export function MermaidBlock({ code, className }: MermaidBlockProps) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ensureMermaidConfigured()
    const id = nextMermaidId()
    let cancelled = false

    mermaid
      .render(id, code)
      .then(({ svg: nextSvg }: { svg: string }) => {
        if (!cancelled) {
          setSvg(nextSvg)
          setError(null)
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e))
          setSvg('')
        }
      })

    return () => {
      cancelled = true
    }
  }, [code])

  if (error) {
    return (
      <pre
        className={className}
        style={{ color: 'var(--destructive, #b91c1c)', whiteSpace: 'pre-wrap' }}
      >
        {error}
      </pre>
    )
  }

  return (
    <div
      className={className}
      // svg from mermaid is sanitized diagram output
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

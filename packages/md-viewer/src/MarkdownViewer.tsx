import type { ComponentProps, ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { MermaidBlock } from './MermaidBlock'

import './markdown-viewer.scss'

export type MarkdownViewerProps = {
  /** Markdown source string (preferred for migration from kv-sub-markdown `value`) */
  value?: string
  children?: string
  className?: string
  /** When false (default), raw HTML in markdown is skipped */
  renderHTML?: boolean
  skipHtml?: boolean
  /** Smaller heading scale (matches legacy `shrinkTitleText`) */
  shrinkTitleText?: boolean
  /** Reserved for parity with legacy component; unused */
  showLinkTilesBelow?: boolean
  /** Custom component overrides passed to react-markdown */
  components?: Record<string, unknown>
  /** Additional remark/rehype plugins */
  rehypePlugins?: ComponentProps<typeof ReactMarkdown>['rehypePlugins']
}

function isMermaidLang(className: string | undefined) {
  const match = /language-(\w+)/.exec(className || '')
  const lang = match?.[1]
  return lang === 'mermaid' || lang === 'mmd'
}

type CodeComponentProps = {
  className?: string
  children?: ReactNode
}

type HeadingComponentProps = {
  children?: ReactNode
  [key: string]: unknown
}

type AnchorComponentProps = {
  href?: string
  children?: ReactNode
  [key: string]: unknown
}

function childrenToText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(childrenToText).join('')
  if (typeof node === 'object' && 'props' in node) {
    return childrenToText(
      (node as { props: { children?: ReactNode } }).props.children,
    )
  }
  return ''
}

/**
 * Generates a URL-safe slug from heading text for use as an HTML `id`.
 * Strips everything except alphanumerics, hyphens, and underscores.
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

function createComponents(): Record<string, unknown> {
  return {
    code({ className, children }: CodeComponentProps) {
      if (isMermaidLang(className)) {
        const codeStr = String(children ?? '').replace(/\n$/, '')
        return <MermaidBlock code={codeStr} className="md-viewer-mermaid" />
      }

      return <code className={className}>{children}</code>
    },

    h1({ children, ...props }: HeadingComponentProps) {
      const id = slugify(childrenToText(children))
      return (
        <h1 id={id || undefined} {...props}>
          {children}
        </h1>
      )
    },

    h2({ children, ...props }: HeadingComponentProps) {
      const id = slugify(childrenToText(children))
      return (
        <h2 id={id || undefined} {...props}>
          {children}
        </h2>
      )
    },

    a({ href, children, ...props }: AnchorComponentProps) {
      if (href?.startsWith('#')) {
        const resolved =
          typeof window !== 'undefined'
            ? `${window.location.pathname}${href}`
            : href
        return (
          <a href={resolved} {...props}>
            {children}
          </a>
        )
      }
      return (
        <a href={href} {...props}>
          {children}
        </a>
      )
    },
  }
}

const defaultComponents = createComponents()

export function MarkdownViewer({
  className,
  value,
  children,
  renderHTML = false,
  shrinkTitleText,
  skipHtml,
  showLinkTilesBelow: _unused,
  components: userComponents,
  rehypePlugins,
}: MarkdownViewerProps) {
  const markdown = value ?? children ?? ''

  const useSmallTitleText =
    !!shrinkTitleText ||
    (!!process.env.IS_MOBILE_DEVICE && shrinkTitleText !== false)

  const wrapperClass = [
    'md-viewer-root',
    'sc-markdown-main-wrapper',
    useSmallTitleText ? 'sc-markdown-use-smaller-title-text' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ')

  const mergedComponents =
    userComponents === undefined
      ? defaultComponents
      : { ...defaultComponents, ...userComponents }

  return (
    <section className={wrapperClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        skipHtml={skipHtml ?? !renderHTML}
        components={mergedComponents}
      >
        {markdown}
      </ReactMarkdown>
    </section>
  )
}

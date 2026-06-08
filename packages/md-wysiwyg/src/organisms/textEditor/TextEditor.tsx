import type { ComponentProps } from 'react'
import { MDXEditor } from '@mdxeditor/editor'
import { mergeClasses } from '@falcon/style'

import { TEXT_ONLY_PLUGINS } from '../../PluginPresets'

import '@mdxeditor/editor/style.css'
import './Editor.scss'

export type TextEditorProps = ComponentProps<typeof MDXEditor>

const TextEditor = ({
  contentEditableClassName,
  className,
  plugins = TEXT_ONLY_PLUGINS,
  ...mdxProps
}: TextEditorProps) => {
  return (
    <MDXEditor
      plugins={plugins}
      className={mergeClasses('editor-main-container', className)}
      contentEditableClassName={mergeClasses(
        'editor-content',
        contentEditableClassName,
      )}
      {...mdxProps}
    />
  )
}

TextEditor.displayName = 'TextEditor'

export { TextEditor }

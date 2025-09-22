import { memo, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import './markdown.css'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from './theme-switcher'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
interface MarkdownProps {
  children: string
}

const Markdown = memo(function Markdown({ children }: MarkdownProps) {
  const theme = useTheme()
  const useDark = theme.currentTheme.name === 'dark'

  // Memoize the components object to prevent recreation on every render
  const components = useMemo(
    () => ({
      code(props: any) {
        const { children, className, node, ...rest } = props
        const match = /language-(\w+)/.exec(className || '')
        return (
          <div className="">
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match?.[1]}
              className={useDark ? '' : 'markdown-syntax'}
              useInlineStyles={useDark}
              style={useDark ? atomDark : {}}
            />
          </div>
        )
      },
    }),
    [useDark],
  )

  const content = processKatexInMarkdown(children)

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
      rehypePlugins={[
        () => {
          return rehypeKatex({ output: 'htmlAndMathml' })
        },
      ]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  )
})

export default Markdown

export function processKatexInMarkdown(markdown: string) {
  const markdownWithKatexSyntax = markdown
    .replace(/\\\\\[/g, '$$$$') // Replace '\\[' with '$$'
    .replace(/\\\\\]/g, '$$$$') // Replace '\\]' with '$$'
    .replace(/\\\\\(/g, '$$$$') // Replace '\\(' with '$$'
    .replace(/\\\\\)/g, '$$$$') // Replace '\\)' with '$$'
    .replace(/\\\[/g, '$$$$') // Replace '\[' with '$$'
    .replace(/\\\]/g, '$$$$') // Replace '\]' with '$$'
    .replace(/\\\(/g, '$$$$') // Replace '\(' with '$$'
    .replace(/\\\)/g, '$$$$') // Replace '\)' with '$$';
  return markdownWithKatexSyntax
}

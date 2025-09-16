import { useMemo, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import './markdown.css'
import { useTheme } from './theme-switcher'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

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

  return <ReactMarkdown components={components}>{children}</ReactMarkdown>
})

export default Markdown

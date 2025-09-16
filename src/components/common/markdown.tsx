import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { useTheme } from './theme-switcher'

import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { createDaisyUISyntaxTheme } from './syntax-themes'

interface MarkdownProps {
  children: string
  /** Whether to use CSS classes instead of inline styles for better performance */
  useCSS?: boolean
}

export default function Markdown({ children }: MarkdownProps) {
  const { currentTheme } = useTheme()
  const theme =
    currentTheme.name === 'dark' ? atomDark : createDaisyUISyntaxTheme()

  console.log(atomDark)
  return (
    <ReactMarkdown
      components={{
        code(props: any) {
          const { children, className, node, ...rest } = props
          const match = /language-(\w+)/.exec(className || '')

          return (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              language={match?.[1]}
              style={theme}
            />
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

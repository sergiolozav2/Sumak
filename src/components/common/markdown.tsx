import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import './markdown.css'
import { createDaisyUISyntaxTheme } from './syntax-themes'
import { useTheme } from './theme-switcher'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface MarkdownProps {
  children: string
}

export default function Markdown({ children }: MarkdownProps) {
  const theme = useTheme()
  const useDark = theme.currentTheme.name === 'dark' ? true : false

  return (
    <ReactMarkdown
      components={{
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
                useInlineStyles={useDark ? true : false}
                style={useDark ? atomDark : {}}
              />
            </div>
          )
        },
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

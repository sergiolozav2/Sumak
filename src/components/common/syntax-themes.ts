// Type definitions for syntax highlighter themes
export interface SyntaxTheme {
  [key: string]: React.CSSProperties
}

/**
 * Creates a theme object that uses CSS custom properties (CSS variables)
 * This allows the theme to automatically adapt to DaisyUI theme changes
 */
export function createDaisyUISyntaxTheme(): SyntaxTheme {
  return {
    'code[class*="language-"]': {
      color: 'oklch(from var(--color-base-content) l c h / 0.9)',
      textShadow: 'none',
      fontFamily:
        '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", Courier, monospace',
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      lineHeight: '1.6',
      MozTabSize: '4',
      OTabSize: '4',
      tabSize: '4',
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
    },
    'pre[class*="language-"]': {
      color: 'oklch(from var(--color-base-content) l c h / 0.9)',
      textShadow: 'none',
      fontFamily:
        '"JetBrains Mono", "Fira Code", Consolas, Monaco, "Courier New", Courier, monospace',
      direction: 'ltr',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      lineHeight: '1.6',
      MozTabSize: '4',
      OTabSize: '4',
      tabSize: '4',
      WebkitHyphens: 'none',
      MozHyphens: 'none',
      msHyphens: 'none',
      hyphens: 'none',
      padding: '1rem',
      margin: '.7em 0.2em',
      overflow: 'auto',
      borderRadius: 'calc(var(--radius-selector, 1rem) * 0.8)',
      background: 'var(--color-base-100)',
      border:
        'calc(var(--border, 1px)) solid oklch(from var(--color-base-300) l c h / 0.3)',
    },
    ':not(pre) > code[class*="language-"]': {
      background: 'oklch(from var(--color-base-200) l c h / 0.8)',
      color: 'var(--color-primary)',
      padding: '0.125rem 0.375rem',
      borderRadius: 'calc(var(--radius-selector, 1rem) * 0.5)',
      fontSize: '0.9em',
    },
    // Comments
    comment: {
      color: 'oklch(from var(--color-success) calc(l * 0.8) c h)',
      fontStyle: 'italic',
    },
    prolog: {
      color: 'oklch(from var(--color-base-content) l c h / 0.6)',
      fontStyle: 'italic',
    },
    doctype: {
      color: 'oklch(from var(--color-base-content) l c h / 0.6)',
      fontStyle: 'italic',
    },
    cdata: {
      color: 'oklch(from var(--color-base-content) l c h / 0.6)',
      fontStyle: 'italic',
    },
    // Keywords
    keyword: {
      color: 'var(--color-primary)',
      fontWeight: '600',
    },
    boolean: {
      color: 'oklch(from var(--color-primary) calc(l + 0.1) c h)',
      fontWeight: '600',
    },
    null: {
      color: 'var(--color-error)',
      fontWeight: '600',
    },
    undefined: {
      color: 'oklch(from var(--color-error) calc(l + 0.1) c h)',
      fontWeight: '600',
    },
    important: {
      color: 'var(--color-warning)',
      fontWeight: '600',
    },
    // Strings
    string: {
      color: 'var(--color-secondary)',
    },
    char: {
      color: 'var(--color-secondary)',
    },
    'attr-value': {
      color: 'oklch(from var(--color-secondary) calc(l * 0.9) c h)',
    },
    'template-string': {
      color: 'oklch(from var(--color-secondary) calc(l + 0.05) c h)',
    },
    // Numbers
    number: {
      color: 'var(--color-accent)',
    },
    // Functions
    function: {
      color: 'var(--color-info)',
    },
    'function-name': {
      color: 'oklch(from var(--color-info) calc(l + 0.05) c h)',
    },
    method: {
      color: 'oklch(from var(--color-info) calc(l * 0.95) c h)',
    },
    // Classes
    'class-name': {
      color: 'var(--color-warning)',
      fontWeight: '600',
    },
    constructor: {
      color: 'oklch(from var(--color-warning) calc(l * 0.9) c h)',
      fontWeight: '600',
    },
    // Variables
    variable: {
      color: 'oklch(from var(--color-base-content) l c h / 0.85)',
    },
    parameter: {
      color: 'oklch(from var(--color-neutral-content) l c h / 0.9)',
    },
    // Operators
    operator: {
      color: 'oklch(from var(--color-base-content) l c h / 0.75)',
    },
    punctuation: {
      color: 'oklch(from var(--color-base-content) l c h / 0.7)',
    },
    // Properties
    property: {
      color: 'oklch(from var(--color-accent) calc(l * 0.8) c h)',
    },
    'property-access': {
      color: 'oklch(from var(--color-accent) calc(l * 0.85) c h)',
    },
    // Built-ins
    builtin: {
      color: 'var(--color-success)',
      fontWeight: '500',
    },
    constant: {
      color: 'oklch(from var(--color-success) calc(l + 0.05) c h)',
      fontWeight: '500',
    },
    symbol: {
      color: 'oklch(from var(--color-success) calc(l * 0.9) c h)',
      fontWeight: '500',
    },
    // JSX/HTML Tags
    tag: {
      color: 'var(--color-error)',
    },
    'tag .punctuation': {
      color: 'oklch(from var(--color-error) l c h / 0.85)',
    },
    // JSX/HTML Attributes
    'attr-name': {
      color: 'oklch(from var(--color-warning) calc(l * 1.1) c h)',
    },
    // Regex
    regex: {
      color: 'oklch(from var(--color-accent) calc(l + 0.1) c h)',
      background: 'oklch(from var(--color-accent) l c h / 0.15)',
      padding: '0.125rem 0.25rem',
      borderRadius: '8px',
    },
    // Deleted/Inserted
    deleted: {
      color: 'var(--color-error)',
      textDecoration: 'line-through',
    },
    inserted: {
      color: 'var(--color-success)',
      textDecoration: 'underline',
    },
    // Namespace
    '.namespace': {
      opacity: '0.75',
    },
  }
}

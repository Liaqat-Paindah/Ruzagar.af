'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import type { Editor } from '@tiptap/react'

// Icon components
const icons = {
  bold: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
      <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
    </svg>
  ),
  italic: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="4" x2="10" y2="4"/>
      <line x1="14" y1="20" x2="5" y2="20"/>
      <line x1="15" y1="4" x2="9" y2="20"/>
    </svg>
  ),
  heading1: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h8"/>
      <path d="M4 18V6"/>
      <path d="M12 18V6"/>
      <path d="M17 12l3-2v8"/>
    </svg>
  ),
  heading2: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h8"/>
      <path d="M4 18V6"/>
      <path d="M12 18V6"/>
      <path d="M21 18h-4c0-4 4-3 4-6 0-1.5-2-2-3-2"/>
    </svg>
  ),
  bulletList: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6"/>
      <line x1="8" y1="12" x2="21" y2="12"/>
      <line x1="8" y1="18" x2="21" y2="18"/>
      <circle cx="4" cy="6" r="1"/>
      <circle cx="4" cy="12" r="1"/>
      <circle cx="4" cy="18" r="1"/>
    </svg>
  ),
  orderedList: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" y1="6" x2="21" y2="6"/>
      <line x1="10" y1="12" x2="21" y2="12"/>
      <line x1="10" y1="18" x2="21" y2="18"/>
      <path d="M4 6h1v4"/>
      <path d="M4 16h3"/>
      <path d="M6 18v-4"/>
    </svg>
  ),
  blockquote: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  ),
  undo: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v6h6"/>
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  ),
  redo: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 7v6h-6"/>
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  ),
}

// Type definitions
interface ToolbarButtonProps {
  onClick: () => void
  isActive: boolean
  icon: React.ReactNode
  title: string
}

interface ToolbarProps {
  editor: Editor | null
}

interface RichTextEditorProps {
  value: string
  onChange: (html: string) => void
  onBlur: () => void
  error?: string
  touched?: boolean
  minLength?: number
  label?: string
}

// Toolbar Component
const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null

  const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, isActive, icon, title }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700'
      }`}
      title={title}
    >
      {icon}
    </button>
  )

  const ToolbarDivider = () => <div  />

  return (
    <div className="border border-input bg-background rounded-t-lg p-2 flex flex-wrap gap-1 items-center">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
        icon={icons.bold}
        title="Bold"
      />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        icon={icons.italic}
        title="Italic"
      />


      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        icon={icons.heading1}
        title="Heading 1"
      />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        icon={icons.heading2}
        title="Heading 2"
      />


      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        icon={icons.bulletList}
        title="Bullet List"
      />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        icon={icons.orderedList}
        title="Ordered List"
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        icon={icons.blockquote}
        title="Blockquote"
      />

      <ToolbarDivider />

      <ToolbarButton
        onClick={() => editor.chain().focus().undo().run()}
        isActive={false}
        icon={icons.undo}
        title="Undo"
      />
      
      <ToolbarButton
        onClick={() => editor.chain().focus().redo().run()}
        isActive={false}
        icon={icons.redo}
        title="Redo"
      />
    </div>
  )
}

// Main Rich Text Editor Component
const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  onBlur,
  error,
  touched,
  minLength = 100,
  label = "Job Description *",
}) => {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    onBlur: () => {
      onBlur()
    },
    editorProps: {
      attributes: {
        class: 'ProseMirror-custom p-4 min-h-[200px] focus:outline-none',
      },
    },
  })

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const currentHtml = editor.getHTML()
      if (value !== currentHtml) {
        editor.commands.setContent(value)
      }
    }
  }, [value, editor])

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Inject styles directly into the document head
  useEffect(() => {
    const styleId = 'rich-text-editor-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .ProseMirror-custom {
          outline: none;
          min-height: 200px;
        }
        
        .ProseMirror-custom ul,
        .ProseMirror-custom ol {
          padding-left: 1.5rem;
          margin: 0.5rem 0;
        }
        
        .ProseMirror-custom ul {
          list-style-type: disc;
        }
        
        .ProseMirror-custom ol {
          list-style-type: decimal;
        }
        
        .ProseMirror-custom li {
          margin: 0.25rem 0;
        }
        
        .ProseMirror-custom h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
        }
        
        .ProseMirror-custom h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem;
        }
        
        .ProseMirror-custom blockquote {
          border-left: 3px solid #e2e8f0;
          padding-left: 1rem;
          margin: 0.5rem 0;
          font-style: italic;
          color: #64748b;
        }
        
        .ProseMirror-custom p {
          margin: 0.5rem 0;
        }
        
        .ProseMirror-custom p:first-child {
          margin-top: 0;
        }
        
        .ProseMirror-custom p:last-child {
          margin-bottom: 0;
        }
        
        .ProseMirror-custom ul:first-child,
        .ProseMirror-custom ol:first-child {
          margin-top: 0;
        }
        
        .ProseMirror-custom ul:last-child,
        .ProseMirror-custom ol:last-child {
          margin-bottom: 0;
        }
      `
      document.head.appendChild(style)
    }
    
    return () => {
      const styleElement = document.getElementById(styleId)
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [])

  if (!isMounted) {
    return (
      <div className="border border-input rounded-lg p-4 animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="h-40 bg-gray-100 rounded"></div>
      </div>
    )
  }

  const textLength = editor?.getText().length || 0

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}
      <div className="relative">
        <Toolbar editor={editor} />
        <div className={`border border-t-0 rounded-b-lg bg-background overflow-hidden ${touched && error ? 'border-destructive' : 'border-input'}`}>
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="mt-1 flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          Minimum {minLength} characters
        </p>
        <p
          className={`text-xs font-medium ${
            textLength >= minLength
              ? "text-green-600"
              : "text-muted-foreground"
          }`}
        >
          {textLength}/{minLength}
        </p>
      </div>
      {touched && error && (
        <p className="mt-1 flex items-center gap-1 text-xs text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </p>
      )}
    </div>
  )
}

export default RichTextEditor
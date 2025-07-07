'use client';

import { Textarea } from '@/components/ui/textarea';
import MarkdownPreview from '@uiw/react-markdown-preview';
import React, { useEffect, useRef, useState } from 'react';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { useEditorStore } from '../../blogs.store';
import BlogTitleDescription from './BlogTitleDescription';

const MarkdownEditor: React.FC = () => {
    const editorRef = useRef<HTMLTextAreaElement>(null);
    const [markdown, setMarkdown] = useState('');

    const setApplyBold = useEditorStore((state) => state.setApplyBold);

    useEffect(() => {
        if (editorRef.current) {
            const textarea = editorRef.current;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            const selected = text.substring(start, end);
            const newText = text.substring(0, start) + `${selected}` + text.substring(end);

            textarea.value = newText;
            textarea.focus();
            textarea.selectionStart = start + 2;
            textarea.selectionEnd = end + 2;
        }
    }, [setApplyBold]);

    return (
        <>
            <div className="grid h-full w-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-2">
                {/* Left Pane - Editor */}
                <div className="flex h-full flex-col overflow-hidden">
                    <BlogTitleDescription />
                    <Textarea
                        ref={editorRef}
                        className="bg-background text-foreground placeholder:text-foreground h-full flex-grow resize-none rounded border-none p-4 font-mono text-3xl shadow-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        value={markdown}
                        onChange={(e) => setMarkdown(e.target.value)}
                        placeholder="Write your markdown here..."
                    />
                </div>

                {/* Right Pane - Preview */}
                <div className="markdown-preview h-full overflow-auto rounded border p-4">
                    <MarkdownPreview
                        source={markdown}
                        remarkPlugins={[remarkBreaks, remarkGfm]}
                        style={{ backgroundColor: 'transparent', color: 'inherit' }}
                        className="prose dark:prose-invert max-w-none list-inside list-disc pl-4"
                    />
                </div>
            </div>
        </>
    );
};

export default MarkdownEditor;

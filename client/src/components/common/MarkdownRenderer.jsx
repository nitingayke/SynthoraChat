import React, { useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

import { Copy, Check } from "lucide-react";
import { copyToClipboard } from "../../utils/copyToClipboard";

export default function MarkdownRenderer({ content }) {

    const [copiedCodeBlock, setCopiedCodeBlock] = useState(null);

    const cleanContent = content
        ?.replaceAll('\\n', "\n")
        ?.replaceAll('\\"', '"');

    const handleCopyCode = async (code, index) => {
        const success = await copyToClipboard(code);
        if (success) {
            setCopiedCodeBlock(index);
            setTimeout(() => setCopiedCodeBlock(null), 2000);
        }
    };

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
                h1: ({ children }) => (
                    <h1 className="text-2xl font-bold mt-6 mb-3 text-[#161616] dark:text-gray-100">
                        {children}
                    </h1>
                ),

                h2: ({ children }) => (
                    <h2 className="text-xl font-semibold mt-5 mb-2 text-[#161616] dark:text-gray-100">
                        {children}
                    </h2>
                ),

                h3: ({ children }) => (
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-[#161616] dark:text-gray-100">
                        {children}
                    </h3>
                ),

                p: ({ children }) => (
                    <p className="mb-1 leading-relaxed text-[#161616] dark:text-gray-200">
                        {children}
                    </p>
                ),

                ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-3 text-[#161616] dark:text-gray-200">
                        {children}
                    </ul>
                ),

                ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-3 text-[#161616] dark:text-gray-100">
                        {children}
                    </ol>
                ),

                li: ({ children }) => (
                    <li className="mb-1 text-[#161616] dark:text-gray-100">
                        {children}
                    </li>
                ),

                strong: ({ children }) => (
                    <strong className="font-semibold text-[#161616] dark:text-gray-100">
                        {children}
                    </strong>
                ),

                em: ({ children }) => (
                    <em className="italic text-[#161616] dark:text-gray-100">
                        {children}
                    </em>
                ),

                a: ({ href, children }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                        {children}
                    </a>
                ),

                blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic text-gray-700 dark:text-gray-300">
                        {children}
                    </blockquote>
                ),

                hr: () => (
                    <hr className="my-4 border-gray-300 dark:border-gray-700" />
                ),

                table: ({ children }) => (
                    <div className="overflow-x-auto my-3">
                        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                            {children}
                        </table>
                    </div>
                ),

                thead: ({ children }) => (
                    <thead className="bg-gray-100 dark:bg-[#2a2a2a]">
                        {children}
                    </thead>
                ),

                tbody: ({ children }) => (
                    <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                        {children}
                    </tbody>
                ),

                tr: ({ children }) => (
                    <tr className="hover:bg-gray-50 dark:hover:bg-[#2a2a2a]">
                        {children}
                    </tr>
                ),

                th: ({ children }) => (
                    <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold text-[#161616] dark:text-gray-100">
                        {children}
                    </th>
                ),

                td: ({ children }) => (
                    <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-[#161616] dark:text-gray-100">
                        {children}
                    </td>
                ),
                code({ inline, className, children, node, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const codeRef = React.createRef();

                    const codeIndex = node?.position?.start?.line ?? Math.random();

                    if (inline) {
                        return (
                            <code className="bg-gray-200 dark:bg-[#2a2a2a] text-[#161616] dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
                                {children}
                            </code>
                        );
                    }

                    return (
                        <div className="relative group my-3 w-full max-w-full min-w-0">
                            {/* Header */}
                            <div className="w-full flex items-center justify-between bg-gray-200 dark:bg-[#1e1e1e] rounded-t-lg px-4 py-2">
                                <span className="text-xs text-gray-700 dark:text-gray-400 font-mono">
                                    {match ? match[1] : 'code'}
                                </span>

                                <button
                                    onClick={() => handleCopyCode(codeRef.current?.innerText, codeIndex)}
                                    className="sticky top-15 flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-gray-300 hover:bg-gray-400 dark:bg-[#2d333b] dark:hover:bg-[#373e47] text-gray-800 dark:text-gray-200 rounded-md transition-colors duration-200"
                                >
                                    {copiedCodeBlock === codeIndex ? (
                                        <>
                                            <Check size={14} className="text-green-400" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={14} />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Scrollable Code */}
                            <pre className="block w-full max-w-full overflow-x-auto whitespace-pre bg-gray-200/50 dark:bg-[#161616] text-[#161616] dark:text-gray-100 p-4 rounded-b-lg">
                                <code
                                    ref={codeRef}
                                    className={`${className} inline-block min-w-max`}
                                    {...props}
                                >
                                    {children}
                                </code>
                            </pre>
                        </div>
                    );
                }
            }}
        >
            {cleanContent}
        </ReactMarkdown>
    );
}

MarkdownRenderer.propTypes = {
    content: PropTypes.string.isRequired,
};
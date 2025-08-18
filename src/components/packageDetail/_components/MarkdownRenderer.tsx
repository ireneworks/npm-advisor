import React from "react";
import Markdown from "react-markdown";
import CodeBlock from "#components/packageDetail/_components/CodeBlock";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
  content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold my-5">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold my-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold my-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-medium my-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-base font-medium my-1">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-sm font-medium my-1">{children}</h6>
          ),

          // Paragraph
          p: ({ children }) => <p className="my-2 leading-loose">{children}</p>,

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-inside ml-5 my-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside ml-5 my-2">{children}</ol>
          ),
          li: ({ children }) => <li className="my-1">{children}</li>,

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">
              {children}
            </blockquote>
          ),

          // Code
          code: CodeBlock,

          // Horizontal rule
          hr: () => <hr className="border-t border-gray-300 my-4" />,

          // Tables
          table: ({ children }) => (
            <table className="table-auto border-collapse border border-gray-300 my-2">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-2 py-1 bg-gray-100">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-2 py-1">{children}</td>
          ),
          tr: ({ children }) => <tr>{children}</tr>,

          // Emphasis
          em: ({ children }) => <em className="italic">{children}</em>,
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          del: ({ children }) => <del className="line-through">{children}</del>,

          // Assets
          picture: ({ children }) => <picture>{children}</picture>,
          source: ({ ...props }) => <source {...props} />,
          img: ({ ...props }) => <img {...props} className="rounded" />,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownRenderer;

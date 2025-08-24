"use client";
import React, { ReactNode } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism as prismTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node?: any;
  inline?: boolean;
  className?: string;
  children: ReactNode[];
}> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const codeString = Array.isArray(children)
    ? children.join("")
    : String(children);

  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={{
          ...prismTheme,
          'pre[class*="language-"]': {
            ...prismTheme['pre[class*="language-"]'],
            fontSize: "14px",
            borderRadius: "5px",
            padding: "16px 20px",
          },
          'code[class*="language-"]': {
            ...prismTheme['code[class*="language-"]'],
            fontSize: "14px",
            borderRadius: "5px",
            padding: "16px 0",
          },
        }}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {codeString.replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className="bg-gray-100 px-1 py-0.5 rounded" {...props}>
      {codeString}
    </code>
  );
};

export default CodeBlock;

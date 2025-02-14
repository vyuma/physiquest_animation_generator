import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {rainbow} from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({code}:{code:string}) => {
const [copied, setCopied] = useState(false); // Copied! の状態

const defaultText ="";


const isDarkMode = () => {
    if (typeof window !== "undefined") {
        return document.documentElement.classList.contains("dark");
    }
    return false;
};


const handleCopy = () => {
const textToCopy = code // .replace(/\\n/g, "\n").replace(/^"|"$/g, "")  || defaultText;
navigator.clipboard.writeText(textToCopy)
    .then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2秒後に消える
    })
    .catch((err) => console.error("コピーに失敗しました", err));
};

return (
<div className="flex flex-col w-full gap-2">
    <form className="flex flex-col gap-2 relative">
    <SyntaxHighlighter language="python"  className="w-full h-60 px-8 py-5 pb-10 !bg-white outline-none resize-none rounded-xl dark:!bg-slate-700 "
        style={ isDarkMode() ?  rainbow :  docco }
        showLineNumbers={true}
        
    >
        {code ? code.replace(/\\n/g, "\n").replace(/^"|"$/g, "") 
        : defaultText}
    </SyntaxHighlighter>
    {/* コピー完了時の吹き出し */}
    {copied && (
        <div className="absolute right-12 bottom-12 bg-black text-white text-sm px-3 py-1 rounded-md dark:bg-white dark:text-slate-700">
        Copied!
        </div>
    )}
    <button
        type="button"
        onClick={handleCopy}
        className="absolute right-0 bottom-2 mb-1 mr-4 w-10 h-10 flex items-center justify-center"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current text-slate-700 dark:text-white" viewBox="0 0 24 24">
        <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3z"
        />
        </svg>
    </button>
    </form>
</div>
);
};

export default Code;

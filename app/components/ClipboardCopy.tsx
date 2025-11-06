import { useState } from "react";
import { useText } from "@/app/context/TextContext"; // コンテキストをインポート
const ClipboardCopy = ({ defaultText = "The sun was setting behind the mountains..." }: { defaultText: string }) => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const { setText } = useText(); // コンテキストからsetTextを取得

  const handleCopy = () => {
    const textToCopy = input || defaultText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("コピーに失敗しました", err));
  };

  const handleAutoFill = () => {
    setText(input || defaultText); // テキストをコンテキストに保存
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <form className="flex flex-col gap-2 w-full relative">
        <div className="w-full h-40 px-8 py-5 pb-10 bg-white text-slate-700 outline-none resize-none rounded-3xl dark:bg-slate-700 dark:text-white">
          {input || defaultText}
        </div>
        
        {copied && (
          <div className="absolute right-12 bottom-12 bg-black text-white text-sm px-3 py-1 rounded-md dark:bg-white dark:text-slate-700">
            Copied!
          </div>
        )}
        
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-0 bottom-2 mb-1 mr-10 w-10 h-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current text-slate-700 dark:text-white" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3z" />
          </svg>
        </button>

        {/* 自動入力ボタン */}
        <button
          type="button"
          onClick={handleAutoFill}
          className="absolute right-0 bottom-4 mb-1 mr-4 w-6 h-6 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current text-slate-800 dark:text-white" viewBox="0 0 24 24">
            <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854zM15 5l3 3" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ClipboardCopy;

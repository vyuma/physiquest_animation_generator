import { useState } from "react";

const ClipboardCopy = () => {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false); // Copied! の状態

  const defaultText =
    "The sun was setting behind the mountains, casting a golden glow over the quiet village. The air was cool and crisp, filled with the scent of pine trees and fresh earth. As the villagers went about their evening routines, there was a sense of peace in the air, as if the world had slowed down for just a moment.";

  const handleCopy = () => {
    const textToCopy = input || defaultText;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // 2秒後に消える
      })
      .catch((err) => console.error("コピーに失敗しました", err));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <form className="flex flex-col gap-2 w-full m-10 mt-4 mb-1 relative">
        <div
          className="w-full h-40 px-8 py-5 pb-10 bg-white text-slate-700 outline-none resize-none rounded-3xl"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {input || defaultText}
        </div>
        {/* コピー完了時の吹き出し */}
        {copied && (
          <div className="absolute right-12 bottom-12 bg-black text-white text-sm px-3 py-1 rounded-md">
            Copied!
          </div>
        )}
        <button
          type="button"
          onClick={handleCopy}
          className="absolute right-0 bottom-2 mb-1 mr-4 w-10 h-10 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current text-slate-700" viewBox="0 0 24 24">
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

export default ClipboardCopy;

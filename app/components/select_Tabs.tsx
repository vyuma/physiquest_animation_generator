import { useState } from "react";
import Tabs from "./Tabs";
import Explanation from "./Explanetion";
import ClipboardCopy from "./ClipboardCopy";

const Select_Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [activePrompt, setActivePrompt] = useState(0); // `tab.tsx` と連動しないようにする

  // タブごとのプロンプトリスト
  const promptLists = [
    [
      { prompt: "create circle animation with blue color" },
      { prompt: "create circle animation with blue color" },
      { prompt: "create circle animation with blue color" },
      { prompt: "create circle animation with blue color" },
      
    ],
    [
      { prompt: "グラフのプロンプト1" },
      { prompt: "グラフのプロンプト2" },
      { prompt: "グラフのプロンプト3" },
      { prompt: "グラフのプロンプト4" },
    ],
    [
      { prompt: "式変形のプロンプト1" },
      { prompt: "式変形のプロンプト2" },
      { prompt: "式変形のプロンプト3" },
      { prompt: "式変形のプロンプト4" },
    ],
    [
      { prompt: "遷移図のプロンプト1" },
      { prompt: "遷移図のプロンプト2" },
      { prompt: "遷移図のプロンプト3" },
      { prompt: "遷移図のプロンプト4" },
    ],
  ];

  return (
    <div>

      <nav className="relative z-0 flex border rounded-xl overflow-hidden dark:border-neutral-700" aria-label="Tabs">
        {["例", "内容"].map((name, index) => (
          <button
            key={index}
            type="button"
            className={`min-w-0 flex-1 bg-white border-s border-b-2 py-2 px-2 text-sm font-medium text-center overflow-hidden focus:z-10 focus:outline-none disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-700 dark:border-l-slate-800 dark:border-b-slate-800 dark:text-neutral-400  
            ${activeTab === index + 1 ? "border-b-sky-400 text-gray-900 dark:text-white dark:bg-slate-800" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:text-white"}`}
            onClick={() => setActiveTab(index + 1)}
          >
            {name}
          </button>
        ))}
      </nav>

      <div className="mt-2">
        {/* 例タブが選択されているとき */}
        {activeTab === 1 && (
          <div className="flex flex-col mt-2 mb-1 gap-y-4">
            {promptLists[activePrompt].map((prompt, index) => (
              <div className="flex flex-col gap-2" key={index}>
                <ClipboardCopy defaultText={prompt.prompt} />
              </div>
            ))}
          </div>
        )}

        {/* 内容タブが選択されているとき */}
        {activeTab === 2 && <Explanation />}
      </div>
    </div>
  );
};

export default Select_Tabs;

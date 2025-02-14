"use client";

import { useEffect, useState } from "react";

const ToggleSwitch = () => {
  // ダークモードの状態を管理
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") === "dark" : false
  );

  // チェック状態を管理
  const [isChecked, setIsChecked] = useState(isDarkMode);

  // ダークモードの適用
  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isChecked]);  // isChecked を監視して変更

  return (
    <label
      htmlFor="darkModeToggle"
      className={`relative inline-block h-8 w-14 cursor-pointer rounded-full transition [-webkit-tap-highlight-color:_transparent] ${isChecked ? "bg-slate-700" : "bg-sky-300"}`}
    >
      <input
        type="checkbox"
        id="darkModeToggle"
        className="peer sr-only"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);  // チェック状態を切り替え
          setIsDarkMode(!isChecked);  // ダークモードの状態も切り替え
        }}
      />
      <span
        className={`absolute inset-y-0 start-0 z-10 m-1 inline-flex size-6 items-center justify-center rounded-full bg-white text-green-400 transition-all ${isChecked ? 'peer-checked:start-6 peer-checked:text-green-600' : ''}`}
      >
        {isChecked ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-current text-slate-700" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3h.393a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 2.992z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-current text-sky-400" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M12 6.75a5.25 5.25 0 1 0 0 10.5a5.25 5.25 0 0 0 0-10.5M5.25 12a6.75 6.75 0 1 1 13.5 0a6.75 6.75 0 0 1-13.5 0m-4 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75" clipRule="evenodd"/>
          </svg>
        )}
      </span>
    </label>
  );
};

export default ToggleSwitch;

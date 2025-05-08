"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const title = "PHYSIQUEST ANIMATION GENERATION";

export default function Page() {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      router.push("/"); // app/page.tsx に遷移
    }, 1000); // アニメーション終了後に遷移
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black p-6 overflow-hidden">
      {/* 背景の月 */}
      <div className="absolute top-10 right-20 w-40 h-40 md:w-60 md:h-60 bg-gray-300 rounded-full shadow-lg opacity-90"></div>
      
      {/* キャラクター画像（クリックでモーダル表示） */}
      <div className="absolute top-36 right-32 z-10">
        <img
          src="/character.png"
          alt="Character"
          className="w-48 md:w-64 h-auto cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        />
        {/* 吹き出しテキスト（右上に配置） */}
        <div className="absolute -top-8 left-24 bg-white text-black text-sm px-4 py-2 rounded-lg shadow-md">
          デモ動画を見てみる？
        </div>
      </div>
      
      {/* モーダル（デモ動画表示） */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <video className="w-full h-auto rounded-lg" controls>
              <source src="/demo-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
      
      {/* 背景の星 */}
      <div className="absolute inset-0">
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-70 top-10 left-20 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-50 top-32 left-80 animate-pulse"></div>
        <div className="absolute w-3 h-3 bg-white rounded-full opacity-80 top-60 right-40 animate-pulse"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full opacity-60 bottom-20 left-10 animate-pulse"></div>
        <div className="absolute w-1 h-1 bg-white rounded-full opacity-50 bottom-40 right-60 animate-pulse"></div>
      </div>
      
      {/* タイトル*/}
      <motion.h1 className="text-4xl md:text-6xl font-bold text-white text-center relative z-10">
        {title.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="mr-2">
            {word.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.05, delay: (wordIndex * 0.5) + index * 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h1>

      {/* サブタイトル */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 mt-4 text-center max-w-2xl relative z-10"
      >
        AIと物理エンジンを活用した、次世代のアニメーション生成ツール。
        簡単な操作で高品質なアニメーションを作成できます。
      </motion.p>

      {/* CTAボタン（アニメーション & 遷移） */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 relative z-10"
      >
        <motion.button
          className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition-all"
          onClick={handleClick}
          animate={isClicked ? { x: 0, y: 0, scale: 2, opacity: 0 } : {}}
          transition={{ duration: 1 }}
        >
          体験してみる
        </motion.button>
      </motion.div>
    </div>
  );
}
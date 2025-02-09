"use client";

import { useState } from "react";

export default function ChatComponent() {
        const [videoUrl, setVideoUrl] = useState<string | null>(null);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);
        const [userPrompt, setUserPrompt] = useState("");
        const generateVideo = async () => {
        setLoading(true);
        setError(null);
        setVideoUrl(null);

        const videoId = "test"; // 固定値 (本番では適切に設定)

        try {
            // 1. プロンプトを送信
            const videoResponse = await fetch(`http://localhost:8000/api/prompt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_prompt: userPrompt, video_id: videoId }),
            });

            if (!videoResponse.ok) {
                throw new Error("動画生成に失敗しました。");
            }

            const blob = await videoResponse.blob();
            const url = URL.createObjectURL(blob);
            setVideoUrl(url);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>動画生成</h2>
            <input 
                type="text" 
                value={userPrompt} 
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="プロンプトを入力してください"
                style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
            />
            <br />
            <button onClick={generateVideo} disabled={loading}>
                {loading ? "生成中..." : "動画を生成"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {videoUrl && (
                <div>
                    <video controls width="400">
                        <source src={videoUrl} type="video/mp4" />
                        お使いのブラウザは video タグをサポートしていません。
                    </video>
                </div>
            )}
        </div>
    );
}
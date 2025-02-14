"use client";

import { useState } from "react";
import ChatComponent from "../components/chat"

export default function VideoPlayer() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const fetchVideo = async () => {
        const videoId = "test"; // 取得する動画のID
        const response = await fetch(`http://localhost:8000/api/get_video/${videoId}`);

        if (!response.ok) {
            alert("動画の取得に失敗しました");
            return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <button onClick={fetchVideo}>動画を取得</button>

            {videoUrl && (
                <div>
                    <video controls width="400">
                        <source src={videoUrl} type="video/mp4" />
                        お使いのブラウザは video タグをサポートしていません。
                    </video>
                </div>
            )}
            <ChatComponent />
        </div>
    );
}

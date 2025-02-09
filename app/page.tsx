"use client";
import React, { useState } from "react";
import Tabs from "./components/Tabs";
import TextInputForm from "./components/TextInputForm";
import ClipboardCopy from "./components/ClipboardCopy";
import VideoComponent from "@/app/components/VIdeo";


export default function Page() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState("");
    


    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        const defulatpath = process.env.NEXT_PUBLIC_API_URL

        console.log(defulatpath)
        const path =  defulatpath+"/api/prompt";
        e.preventDefault();
        if (!userPrompt) return;
        // VideoIdsession管理
        const videoId = "test";

        try {
            // 1. プロンプトを送信
            const videoResponse = await fetch(path, {
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
            console.log(error)
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="flex w-full gap-2 justify-center">

            <div className="flex flex-col w-[40%] ">
                <TextInputForm input={userPrompt} handleSubmit={handleSubmit} setInput={setUserPrompt} loading={loading} />
                <Tabs />  
                <ClipboardCopy/>
                <ClipboardCopy/>
                <ClipboardCopy/>
                <ClipboardCopy/>

            </div>
            <div className="flex flex-col w-[40%] ">
                <VideoComponent videoUrl={videoUrl}/>
            </div>
            
            
        </div>
    );
}

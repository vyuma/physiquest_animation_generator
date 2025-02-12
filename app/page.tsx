"use client";
import React, { useState, useEffect } from "react";
import Tabs from "./components/Tabs";
import TextInputForm from "./components/TextInputForm";
import ClipboardCopy from "./components/ClipboardCopy";
import VideoComponent from "@/app/components/VIdeo";
import Headers from "@/app/components/header";
import { examplePrompt,examplePromptfilter } from "@/app/data/examplePrompt";
import DawnloadButton from "@/app/components/DownloadButton";
import Code from "@/app/components/Code";
import { v4 as uuid } from "uuid";
import promptDesoger from "@/app/utils/fetchPromptDesoger";


export default function Page() {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userPrompt, setUserPrompt] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [filteredExamplePrompt, setFilteredExamplePrompt] = useState(examplePrompt.generateAnimationPrompt);
    const [code, setCode] = useState<string>("");
    const [videoId, setVideoId] = useState<string>("test");


    useEffect(()=>{
        setFilteredExamplePrompt(examplePromptfilter(examplePrompt, activeTab))
    },[activeTab])

    async function synchronize_video(){
        // このvideoIdはsession情報において少し考える必要がある。
        setLoading(true);
        const defulatpath = process.env.NEXT_PUBLIC_API_URL
        const path =  defulatpath+"/api/get_script/" + videoId;
        const response = await fetch(path, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("動画の取得に失敗しました");
        }else{
            const code = await response.text();
            const formattedText = code
                                .replace(/\\n/g, "\n")  // 🔹 \n を改行に変換
                                .replace(/\\"/g, "\"")  // 🔹 \" を " に戻す
                                .replace(/^"|"$/g, ""); // 🔹 先頭と末尾の " を削除
            setCode(formattedText);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        const defulatpath = process.env.NEXT_PUBLIC_API_URL
        setVideoId(uuid());
        console.log(defulatpath)
        const path =  defulatpath+"/api/prompt";
        e.preventDefault();
        if (!userPrompt) return;
        // 50文字未満の場合は記述量を多くする処理を行う
        if(userPrompt.length <50){
            const rewritePrompt = await promptDesoger({user_prompt:userPrompt,instruction_type:activeTab});
            setUserPrompt(rewritePrompt);
            setLoading(false);
        }else{
            try {
                // 1. プロンプトを送信
                const videoResponse = await fetch(path, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ user_prompt: userPrompt, video_id: videoId ,instruction_type : activeTab}),
                });

                if (!videoResponse.ok) {
                    throw new Error("動画生成に失敗しました。");
                }

                const blob = await videoResponse.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                synchronize_video();
            } catch (err) {
                setError((err as Error).message);
                console.log(error)
            } finally {
                setLoading(false);
            }
        }
            
    
    }


    return (
    <div className="flex flex-col w-full gap-2">
            <Headers />
        <div className="flex w-full gap-2 justify-center">
            <div className="flex flex-col w-[40%] ">
                <div className="ml-10 mt-10">
                    <TextInputForm input={userPrompt}  handleSubmit={handleSubmit} setInput={setUserPrompt} loading={loading} />
                </div>
                
                <div className="mb-5">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} /> 
                </div>

                <div className="flex flex-col ml-10 mt-4 mb-1 gap-y-4">
                    {
                        filteredExamplePrompt.map((prompt,index) => {
                            return (
                                <div className="flex flex-col gap-2" key={index}>
                                    <ClipboardCopy defaultText={prompt.prompt} />
                                </div>
                            );
                        })
                    }
                </div>
                
            </div>
            <div className="flex flex-col w-[40%] ">
                <div className="my-10 ml-20">
                    <VideoComponent videoUrl={videoUrl}/>
                </div>
                <div>
                    {
                        videoUrl && <DawnloadButton videoUrl={videoUrl} />
                    }
                </div>
                <div className="my-10 ml-20">
                    <Code code={code} />
                </div>
            </div>

        </div>   
    </div>
        
    );
}

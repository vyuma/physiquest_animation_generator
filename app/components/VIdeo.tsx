import React from "react"; 
import DawnloadButton from "@/app/components/DownloadButton";


type VideoUrl = {
    videoUrl: string|null;
}

const VideoComponent = ({videoUrl}:VideoUrl) => {

        if (!videoUrl) {
            return (
                <div className="w-[48rem] h-[27rem] bg-gray-200 shadow-md  rounded-xl">
                    {/* なにも表示しないスペース */}
                </div>
            );
        }
        // 動画が設定されている場合
        return (
            <div >
                {/* ここはリスポンス対応する必要ある */}
                <video controls width="768" className="object-fill rounded-xl" autoPlay muted>
                    <source src={videoUrl} type="video/mp4"  />
                    お使いのブラウザは video タグをサポートしていません。
                </video>
            </div>
        );
}


export default VideoComponent;
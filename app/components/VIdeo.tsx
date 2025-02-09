import React, { useState } from "react"; 


type VideoUrl = {
    videoUrl: string|null;
}

const VideoComponent = ({videoUrl}:VideoUrl) => {

        if (!videoUrl) {
            return (
                <div className="w-[48rem] h-[27rem] bg-gray-500  my-10 ml-20">
                    
                </div>
            );
        }
        // 動画が設定されている場合
        return (
            <div>
                {/* ここはリスポンス対応する必要ある */}
                <video controls width="768" className="object-fill my-10 ml-20">
                    <source src={videoUrl} type="video/mp4" />
                    お使いのブラウザは video タグをサポートしていません。
                </video>
            </div>
        );
}


export default VideoComponent;
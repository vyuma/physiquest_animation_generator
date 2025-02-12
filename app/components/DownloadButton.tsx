import { useState } from "react";
import fetchVideo from "@/app/utils/fetchVideo";


type DownloadButtonProps =  {
    videoUrl: string;
}

const DawnloadButton = ({videoUrl}:DownloadButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
    setLoading(true);
    const url = videoUrl;
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4"; // 🔹 MP4形式でダウンロード
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setLoading(false);
    };

    return (
    <button 
        onClick={handleDownload} 
        disabled={loading}
        className="flex items-center gap-3"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" d="m9 9.114l1.85-1.943a.52.52 0 0 1 .77 0c.214.228.214.6 0 .829l-1.95 2.05a1.55 1.55 0 0 1-2.31 0L5.41 8a.617.617 0 0 1 0-.829a.52.52 0 0 1 .77 0L8 9.082V.556C8 .249 8.224 0 8.5 0s.5.249.5.556z"/><path fill="currentColor" d="M16 13.006V10h-1v3.006a.995.995 0 0 1-.994.994H3.01a.995.995 0 0 1-.994-.994V10h-1v3.006c0 1.1.892 1.994 1.994 1.994h10.996c1.1 0 1.994-.893 1.994-1.994"/></svg>
        {loading ? "Downloading..." : "Download MP4"}
    </button>
    );
}

export default DawnloadButton;
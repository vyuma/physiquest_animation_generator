const fetchVideo = async(videoUrl:string):Promise<string| null> => { 
    try {
        const path = process.env.NEXT_PUBLIC_API_URL + "/api/get_video/" + videoUrl;
        const response = await fetch(
            path,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            }
        )

        if (!response.ok) {
            throw new Error("動画の取得に失敗しました");
        };
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        return url 
    } catch (err) {
        console.error("Error fetching video:" ,err);
        return null;
    }
}

export default fetchVideo;
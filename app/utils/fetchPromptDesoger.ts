import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";

type Prompt = {
    user_prompt: string;
    instruction_type: number;
}




const promptDesigner:(Prompt:Prompt)=>Promise<string> = async({user_prompt,instruction_type}:Prompt) => { 
    try {
        
        const path = process.env.NEXT_PUBLIC_API_URL + "/api/generate_detail_prompt";
        const response = await fetch(
            path,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_prompt: user_prompt ,instruction_type : instruction_type }),
            }
        )

        if (!response.ok) {
            throw new Error("修正に失敗しました");
        };
        const data = await response.json();
        return data.output

    } catch (err) {
        console.error("Error fetching Prompt:" ,err);
        return "Error";
    }
}

export default promptDesigner;
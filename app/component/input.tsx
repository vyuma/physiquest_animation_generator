"use client";

import { useState } from "react";
import { InputComponentProps } from "@/app/types/formType";


export default function InputComponent({  onUpdateUserPrompt, userPrompt }: InputComponentProps) {


return (
    <div>
        <input 
                type="text" 
                value={userPrompt} 
                onChange={(e) => onUpdateUserPrompt(e.target.value)}
                placeholder="プロンプトを入力してください"
                style={{ padding: "8px", width: "80%", marginBottom: "10px" }}
            />
    </div>
);
}
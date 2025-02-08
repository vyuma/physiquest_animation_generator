"use client";

import React, { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { runAgent } from "./actions";
import { StreamEvent } from "@langchain/core/tracers/log_stream";


export default function Page() {
    const [input, setInput] = useState("");
    const [data, setData] = useState<StreamEvent[]>([]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input) return;
        const { streamData } = await runAgent(input);
        for await (const item of readStreamableValue(streamData)) {
            setData((prev) => [...prev, item]);
        }
    }
    let chatResults: any = [];
    for (let i = 0; i < data.length; i++) {
        switch (data[i].event) {
            case "on_tool_start":
                chatResults.push({
                    type: "tool",
                    runID: data[i].run_id,
                    input: data[i].data.input,
                    output: null,
                    name: data[i].name,
                });
                break;
            case "on_tool_end":
                const toolIndex = chatResults.findIndex(
                    (item: any) => item.runID === data[i].run_id
                );
                chatResults[toolIndex].output = data[i].data.output;
                break;
            case "on_chat_model_start":
                chatResults.push({
                    type: "message",
                    runID: data[i].run_id,
                    output: "",
                });
                break;
            case "on_chat_model_stream":
                const messageIndex = chatResults.findIndex(
                    (item: any) => item.runID === data[i].run_id
                );
                chatResults[messageIndex].output = chatResults[messageIndex].output + data[i].data.chunk.kwargs.content;
                break;
        }
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mr-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Run
                </button>
            </form>
            <div className="flex flex-col w-full gap-2">
                <div
                    className="flex flex-col gap-2 px-2 h-[650px] overflow-y-auto"
                >
                    {
                        chatResults.map((item: any, i: number) => {
                            switch (item.type) {
                                case "tool":
                                    return (
                                        <div key={i} className="p-4 bg-slate-100 rounded-lg">
                                            <strong><code>{item.name}</code> Input</strong>
                                            <pre className="break-all text-sm">
                                                {JSON.stringify(item.input, null, 2)}
                                            </pre>
                                            {item.output && (
                                                <>
                                                    <strong>Tool result</strong>
                                                    <pre className="break-all text-sm">
                                                        {JSON.stringify(item.output, null, 2)}
                                                    </pre>
                                                </>
                                            )}
                                        </div>
                                    );
                                case "message":
                                    if (item.output === "") return null;
                                    return (
                                        <div key={i} className="p-4 bg-slate-100 rounded-lg prose">

                                            {item.output}
                                        </div>
                                    );
                                default:
                                    return null;
                            }

                        })

                    }
                </div>
            </div>
        </div>
    );
}

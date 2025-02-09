"use server";

import { createStreamableValue } from "ai/rsc";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

export async function runAgent(input: string) {
    console.log("input", input);
    const stream = createStreamableValue();
    const chain = new RemoteRunnable({
        url: `http://localhost:8000/`,
    });

    async function processStreamingEvents() {
        const streamingEvents = chain.streamEvents(
            { input },
            { version: "v2" }
        );

        for await (const item of streamingEvents) {
            const formattedItem = JSON.parse(JSON.stringify(item, null, 2));
            stream.update(formattedItem);
        }
        stream.done();
    }

    // Start processing the streaming events
    processStreamingEvents();

    return { streamData: stream.value };
}

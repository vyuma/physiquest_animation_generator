
export type examplePromptType = {
    generateAnimationPrompt : {
        type: string,
        prompt: string,
    }[]
}

export const examplePromptfilter = (examplePrompt: examplePromptType, activeTab:number) => { 
    if (activeTab === 0) {
        return examplePrompt.generateAnimationPrompt.filter((prompt) => prompt.type === "anime_generator")
    }else if (activeTab === 1) {
        return examplePrompt.generateAnimationPrompt.filter((prompt) => prompt.type === "graphic_generator")
    }else if (activeTab === 2) {
        return examplePrompt.generateAnimationPrompt.filter((prompt) => prompt.type === "transform_function")
    }else if (activeTab === 3) {
        return examplePrompt.generateAnimationPrompt.filter((prompt) => prompt.type === "trans_diagram")
    }else {
        return examplePrompt.generateAnimationPrompt
    }
    
}

export const examplePrompt = {
    generateAnimationPrompt : [
        {
            type: "anime_generator",
            prompt: "create circle animation with blue color", 
        },
        {
            type: "anime_generator",
            prompt: "create square animation with red color", 
        },
        {
            type: "anime_generator",
            prompt: "create triangle animation with green color", 
        },
        {
            type: "anime_generator",
            prompt: "create star animation with yellow color", 
        },
        {
            type: "anime_generator",
            prompt: "create heart animation with pink color", 
        },
        {
            type: "graphic_generator",
            prompt: "create axies with x-axis and y-axis",
        },
        {
            type: "graphic_generator",
            prompt: "create axies with x-axis and y-axis",
        },
        {
            type: "graphic_generator",
            prompt: "create axies with x-axis and y-axis",
        },
        {
            type: "graphic_generator",
            prompt: "create axies with x-axis and y-axis",
        },
        {
            type: "graphic_generator",
            prompt: "create axies with x-axis and y-axis",
        },
        {
            type : "transform_function",
            prompt : "please solve x = 2 * x + 1 ",
        },
        {
            type : "transform_function",
            prompt : "please solve x = 2 * x + 1 ",
        },
        {
            type : "transform_function",
            prompt : "please solve x = 2 * x + 1 ",
        },
        {
            type : "transform_function",
            prompt : "please solve x = 2 * x + 1 ",
        },
        {
            type : "transform_function",
            prompt : "please solve x = 2 * x + 1 ",
        },
        {
            type: "trans_diagram",
            prompt: "create diagram with P, Q, R, S, T, U, V, W, X, Y, Z",
        },
        {
            type: "trans_diagram",
            prompt: "create diagram with P, Q, R, S, T, U, V, W, X, Y, Z",
        },
        {
            type: "trans_diagram",
            prompt: "create diagram with P, Q, R, S, T, U, V, W, X, Y, Z",
        },
        {
            type: "trans_diagram",
            prompt: "create diagram with P, Q, R, S, T, U, V, W, X, Y, Z",
        },
        {
            type: "trans_diagram",
            prompt: "create diagram with P, Q, R, S, T, U, V, W, X, Y, Z",
        },
    ]
    
}


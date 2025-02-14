import React from "react";
import LoadingDots from "@/app/components/loadingAnimation";


type formProps = {
    input : string;
    handleSubmit : (e: React.FormEvent) => void;
    setInput : (value: string) => void;
    loading : boolean;
}

const TextInputForm = ({input,handleSubmit,setInput,loading}:formProps) => {

  const Button = (loading: boolean,input:string) => {

    if (loading) {
        return (
            <button
                type="submit"
                className="absolute right-0 bottom-4 mb-1 mr-4 w-10 h-10 rounded-full flex items-center justify-center bg-gray-400 cursor-not-allowed"
                disabled
            >
                <LoadingDots />
            </button>  
            )
    } else {
        return (
          <button
          type="submit"
          className={`absolute right-0 bottom-4 mb-1 mr-4 w-10 h-10 rounded-full flex items-center justify-center ${input ? "bg-sky-400 dark:bg-slate-600" : "bg-gray-400 cursor-not-allowed"}`}
          disabled={!input}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3 20V4l19 8M5 17l11.85-5L5 7v3.5l6 1.5l-6 1.5M5 17V7v6.5Z" />
          </svg>
        </button>
    )
    }
    
}

  return (
    <div className="flex flex-col w-full gap-2">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full  relative">
        <textarea
          className="w-full h-40 px-5 py-3 pb-10 outline-none resize-none rounded-3xl shadow-lg dark:bg-slate-700 dark:text-white"
          placeholder="文章を入力して下さい"
          value={input}
          onChange={(e) => setInput(e.target.value)} 
        />
        <div>
          {Button(loading,input)}
          
        </div>

        
      </form>
    </div>
  );
};

export default TextInputForm;

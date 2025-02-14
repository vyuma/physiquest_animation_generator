import React from 'react'; 
import ToggleSwitch from './ToggleSwitch';


const Headers = () => {
    return (
        <div className="w-full bg-slate-200 from-slate-50 from- to-zinc-200 to- h-20 flex justify-center items-center shadow-md dark:bg-slate-800">
            <h1 className="text-black text-3xl mr-10 dark:text-white">Physiquest Animation Generator </h1>
            <ToggleSwitch />
        </div>
    );
}

export default Headers;

import { useState } from "react";

type activeTab = {
    activeTab: number;
    setActiveTab: (index: number) => void;
}


const Tabs = ({activeTab,setActiveTab}: activeTab) => {

  const tabData = [
    {
      title: "アニメ生成",
      icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 fill-current text-none" viewBox="0 0 24 24">
          <path fill="currentColor" d="M3.5 19A1.5 1.5 0 0 1 5 20.5A1.5 1.5 0 0 1 3.5 22A1.5 1.5 0 0 1 2 20.5A1.5 1.5 0 0 1 3.5 19m5-3a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 8.5 21A2.5 2.5 0 0 1 6 18.5A2.5 2.5 0 0 1 8.5 16m6-1c-1.19 0-2.27-.5-3-1.35c-.73.85-1.81 1.35-3 1.35c-1.96 0-3.59-1.41-3.93-3.26A4.02 4.02 0 0 1 2 8a4 4 0 0 1 4-4c.26 0 .5.03.77.07C7.5 3.41 8.45 3 9.5 3c1.19 0 2.27.5 3 1.35c.73-.85 1.81-1.35 3-1.35c1.96 0 3.59 1.41 3.93 3.26A4.02 4.02 0 0 1 22 10a4 4 0 0 1-4 4l-.77-.07c-.73.66-1.68 1.07-2.73 1.07"/>
        </svg>
        
      ),
    },
    {
      title: "グラフ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1
        // fill-current text-none" viewBox="0 0 24 24">
        <path d="m16 11.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L5.46 19H22v2H2V3h2v14.54L9.5 8z"/>
        </svg>

      ),
    },
    {
      title: "式変形",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 fill-current text-none" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12.482 3.827c-1.113-.824-2.696-.091-2.788 1.29L9.535 7.5h2.715a.75.75 0 0 1 0 1.5H9.435l-.6 9.006c-.18 2.685-3.358 4.002-5.383 2.23l-.196-.172a.75.75 0 0 1 .988-1.129l.195.171c1.091.955 2.803.246 2.899-1.2L7.932 9H5.75a.75.75 0 0 1 0-1.5h2.282l.165-2.483c.171-2.565 3.112-3.926 5.178-2.395l.371.275a.75.75 0 1 1-.892 1.205zm1.23 8.936a.75.75 0 0 0-1.152-.22l-.322.276a.75.75 0 1 1-.976-1.139l.322-.276a2.25 2.25 0 0 1 3.456.66l.977 1.858l2.703-2.703a.75.75 0 1 1 1.06 1.061l-3.031 3.032l1.539 2.924a.75.75 0 0 0 1.152.22l.322-.276a.75.75 0 0 1 .976 1.14l-.322.275a2.25 2.25 0 0 1-3.456-.66l-1.322-2.513l-3.358 3.358a.75.75 0 1 1-1.06-1.06l3.687-3.687z"/>
        </svg>

      ),
    },
    {
      title: "遷移図",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 fill-current text-none" viewBox="0 0 32 32">
        <path fill="currentColor" d="M24 20a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0-6a2 2 0 1 0 0 4a2 2 0 0 0 0-4m-8.2-5.62A4 4 0 1 1 18 1.06a4 4 0 0 1-2.2 7.32m0-6a2 2 0 1 0 .01 0zm.01 29.24a4 4 0 1 1-.083-8a4 4 0 0 1 .083 8m0-6a2 2 0 1 0 .39 0a2 2 0 0 0-.4 0z" className="ouiIcon__fillSecondary"/>
        <path fill="currentColor" d="M18 17v-2h-6.14a4 4 0 0 0-.86-1.64l2.31-3.44l-1.68-1.12l-2.31 3.44A4 4 0 0 0 8 12a4 4 0 1 0 0 8a4 4 0 0 0 1.32-.24l2.31 3.44l1.66-1.12L11 18.64a4 4 0 0 0 .86-1.64zM6 16a2 2 0 1 1 4 0a2 2 0 0 1-4 0"/>
        </svg>

      ),
    },
    
  ];

  return (
    <div className=" w-full mx-auto">
        <div className="flex justify-center space-x-4 mt-5"> 
            {tabData.map((tab, index) => (
            <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`pt-1 pb-1 p-4 rounded-2xl flex items-center justify-center ${
                activeTab === index
                    ? "bg-sky-400 text-white dark:bg-sky-700 "
                    : "bg-white text-slate-700 dark:bg-slate-700 dark:text-white"
                }`}
            >
                {tab.icon}
                {tab.title}
            </button>
            ))}
        </div>
      </div>

  );
};

export default Tabs;

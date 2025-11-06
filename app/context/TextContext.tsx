"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TextContextType = {
  text: string;
  setText: (text: string) => void;
};

const TextContext = createContext<TextContextType | undefined>(undefined);

export const TextProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState("");

  return (
    <TextContext.Provider value={{ text, setText }}>
      {children}
    </TextContext.Provider>
  );
};

export const useText = () => {
  const context = useContext(TextContext);
  if (!context) {
    throw new Error("useText must be used within a TextProvider");
  }
  return context;
};

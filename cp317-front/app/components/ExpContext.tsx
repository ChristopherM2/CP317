import React, { createContext, useState, ReactNode } from 'react';

interface ExpContextType {
  exp: number;
  addExp: (value: number) => void;
}

export const ExpContext = createContext<ExpContextType | undefined>(undefined);

interface ExpProviderProps {
  children: ReactNode;
}

export const ExpProvider: React.FC<ExpProviderProps> = ({ children }) => {
  const [exp, setExp] = useState<number>(0);

  const addExp = (value: number) => {
    setExp((prevExp) => prevExp + value);
  };

  return (
    <ExpContext.Provider value={{ exp, addExp }}>
      {children}
    </ExpContext.Provider>
  );
};
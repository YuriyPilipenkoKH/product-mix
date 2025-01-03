// src/context/SessionContext.tsx
'use client';


import { Session } from 'next-auth';
import React, { createContext, useContext } from 'react';

export interface SessionContextType {
  session: Session; // Replace with your session type if available
}

 export const SessionContext = createContext<SessionContextType | undefined>(undefined);


export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};

 const SessionProvider = ({
  session,
  children,
}: {
  session: Session; // Replace with your session type
  children: React.ReactNode;
}) => {
  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
export default  SessionProvider

export const defaultSession = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "user",
  },
  expires:''
};
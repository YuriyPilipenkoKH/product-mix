// src/context/SessionContext.tsx
'use client';


import { Session } from 'next-auth';
import React, { createContext, useContext } from 'react';

interface SessionContextType {
  session: Session; // Replace with your session type if available
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessionContext must be used within a SessionProvider');
  }
  return context;
};

export const SessionProvider = ({
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

export const defaultSession = {
  user: {
    id: "",
    name: "",
    email: "",
    role: "user",
  },
  expires:''
};
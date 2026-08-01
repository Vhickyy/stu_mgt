"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react";

type GlobalContextType = {};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    </QueryClientProvider>
  );
};

export const useGlobal = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error("useGlobal must be used within GlobalProvider");
  return ctx;
};

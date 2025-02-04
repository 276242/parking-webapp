import React, { createContext, useContext, useMemo } from 'react';
import { ParkingClient } from './ParkingClient';

const ApiContext = createContext<ParkingClient | null>(null);

export default function ApiProvider({ children }: { children: React.ReactNode }) {
  const apiClient = useMemo(() => new ParkingClient(), []);

  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
}

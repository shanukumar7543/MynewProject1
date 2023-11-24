import React, { useContext, useMemo, useState } from 'react';

const context = React.createContext<any>(null);

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({});

  const value = useMemo(() => ({ state, setState }), [state]);

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useStore = () => {
  return useContext(context);
};

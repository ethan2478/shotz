import React from 'react';

interface OperationsContextValue {
  currentOperationRef: React.MutableRefObject<HTMLDivElement | undefined>;
}

const OperationsContext = React.createContext<OperationsContextValue | null>(
  null,
);

export const useOperationsContext = () => {
  const context = React.useContext(OperationsContext);

  if (!context) {
    throw new Error(
      'Component must be wrapped with OperationsContextContainer',
    );
  }

  return context;
};

export const OperationsContextContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const currentOperationRef = React.useRef<HTMLDivElement>();

  const value = React.useMemo(
    () => ({
      currentOperationRef,
    }),
    [currentOperationRef],
  );

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};

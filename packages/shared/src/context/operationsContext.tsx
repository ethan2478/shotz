import React from 'react';

interface OperationsContextValue {
  currentOperationBtn?: HTMLDivElement;
  setCurrentOperationBtn: React.Dispatch<
    React.SetStateAction<HTMLDivElement | undefined>
  >;
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
  const [currentOperationBtn, setCurrentOperationBtn] =
    React.useState<HTMLDivElement>();

  const value = React.useMemo(
    () => ({
      currentOperationBtn,
      setCurrentOperationBtn,
    }),
    [currentOperationBtn],
  );

  return (
    <OperationsContext.Provider value={value}>
      {children}
    </OperationsContext.Provider>
  );
};

import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { CheerUpPage } from './pages/CheerUpPage';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <CheerUpPage />
    </>
  );
};

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // BrowserRouter 가져오기
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 애플리케이션 전체를 BrowserRouter로 감쌈 */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
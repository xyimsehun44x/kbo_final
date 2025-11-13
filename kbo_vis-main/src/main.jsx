// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';        // 확장자(.jsx) 포함, 정확한 경로 확인!
import './styles/main.css';         // styles 폴더와 파일명이 맞는지 확인
console.log('🔌 main.jsx loaded');
ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);

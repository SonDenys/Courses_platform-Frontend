import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./index.less";
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from "antd";
import aeonxThemeVars from './theme/aeonx-theme1/variables/aeonx-theme-vars';

// ConfigProvider.config({
//   theme: aeonxThemeVars as any
// })

ReactDOM.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

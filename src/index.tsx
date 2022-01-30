import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./index.less";
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ConfigProvider } from "antd";
import aeonxThemeVars from './theme/aeonx-theme1/variables/aeonx-theme-vars';
import { init_i18n } from './Locale';
import { loadPublicKey, loadTokenCache } from './Auth';
import konsole from './konsole';

// ConfigProvider.config({
//   theme: aeonxThemeVars as any
// })
ReactDOM.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
  ,document.getElementById('root')
);
reportWebVitals();

function main() {
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



async function startup() {
  // init_i18n();
  // await loadPublicKey();
  // const data = await loadTokenCache();
  // const data = {}

  // if (Object.keys(data).length) {
  //   getSocket()
  // }
  // axios_config_init();
}

// (async () => {
//   await startup();
//   main();
// })();


main();


import React, { Suspense } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Comp1 from './components/comp1';
import AppRouter from './pages/AppRouter';
import { RecoilRoot } from "recoil";
// import Helmet from "react-helmet";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";
// import MainApp from './pages/MainApp';

function App() {
  return (
    <>
    <h1>Hello</h1>
      <RecoilRoot>
        {/* <Helmet></Helmet> */}
        <ToastProvider
          autoDismiss
          autoDismissTimeout={4000}
          placement={"bottom-right"}
        >
          <Suspense fallback>
            <BrowserRouter>
              {/* <AppRouter /> */}
              <h1>Hello</h1>
              <AppRouter />


            </BrowserRouter>
          </Suspense>
        </ToastProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

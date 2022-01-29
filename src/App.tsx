import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

function App() {
  return (
    <>
    <h1 className="text-3xl text-red-600 font-bold underline">
      Hello world!
    </h1>
    <Button type='dashed'>
      Hello world!
    </Button>
    </>
  );
}

export default App;

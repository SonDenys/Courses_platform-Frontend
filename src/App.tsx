import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import Comp1 from './components/comp1';

function App() {
  return (
    <>
    <h1 className="text-3xl text-red-600 font-bold underline">
      Hello world!
    </h1>
    <Button type="primary" className='hover:animate-bounce hover:delay-500 hover:h-16 hover:w-48'>
      Hello world!
    </Button>
    <Comp1 />
    </>
  );
}

export default App;

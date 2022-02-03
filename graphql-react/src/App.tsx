import React from 'react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import Routes from './routes'
import './App.css';



const engine = new Styletron()

function App() {
  return (
    <StyletronProvider value={engine}>
     
      <Routes/>
     
    </StyletronProvider>
   
  );
}

export default App;

import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Cases from './components/Cases';
import Dropdown from './components/Dropdown';
import StateProvider from './contexts/stateContext';



function App() {
  return (
    <div className="App">
      
      <Nav/>
      
      <div className="container-fluid">
        <div className="row">
      
          <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            
            <StateProvider>
              
              <Dropdown />

              
              
              <br /><br />
              
              <Cases />
              
            </StateProvider>
      
            

          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

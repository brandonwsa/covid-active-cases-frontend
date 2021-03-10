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
      
      <div className="content-section-update">
        <h3>Now using CDC's COVID API. The COVID Tracking Project API previously used has officially ended on March 7th 2021, due to government improvement on tracking the virus.</h3>
        <p>
        </p>
      </div>

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

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
      
      <div className="content-section-alert">
        <h3>Unforntunately the COVID Tracking Project has officially ended on March 7th 2021, due to government improvement on tracking the virus.</h3>
        <p>This web app will still function up until current data for past two weeks in non existant. In the mean time, 
          a new reliable API is being searched for to continue this project.
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

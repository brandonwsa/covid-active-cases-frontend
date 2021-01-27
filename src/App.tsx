import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Cases from './components/Cases';
import Chart from './components/Chart';

function App() {
  return (
    <div className="App">
      
      <Nav/>
      
      <div className="container-fluid">
        <div className="row">
      
          <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      
            <h2>New Positive Case Increases per day for two weeks: </h2>
            <Chart />
      
            <br /><br />

            <Cases/>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

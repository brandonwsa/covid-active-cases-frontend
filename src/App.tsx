import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Cases from './components/Cases';

function App() {
  return (
    <div className="App">
      
      <Nav/>
      
      <div className="container-fluid">
        <div className="row">
      
          <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      
            <h2>Chart goes here</h2>
            <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
      
            <Cases/>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

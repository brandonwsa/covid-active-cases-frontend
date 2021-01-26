import React from 'react';
import './App.css';
import Nav from './components/Nav';

function App() {
  return (
    <div className="App">
      
      <Nav/>
      
      <div className="container-fluid">
        <div className="row">
      
          <main role="main" className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      
            <h2>Chart goes here</h2>
            <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas>
      
            <h2>Section title</h2>
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                    <th>Header</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1,001</td>
                    <td>Lorem</td>
                    <td>ipsum</td>
                    <td>dolor</td>
                    <td>sit</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

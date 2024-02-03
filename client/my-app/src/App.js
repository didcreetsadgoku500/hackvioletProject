import React from 'react';
import './App.css';
import appPage from './appPage/appPage';
import trackerPage from './trackerPage/trackerPage';


function App() {
  let url = window.location.pathname


  let page = (url == "/") ? appPage() : trackerPage();
  console.log(url)

  return (
    <div className="App">
      <header className="App-header">
        {page}
      </header>
    </div>
  );
}

export default App;

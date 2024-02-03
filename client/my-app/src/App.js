import React from 'react';
import './App.css';
 
import appPage from './appPage/appPage';
import trackerPage from './trackerPage/trackerPage';


function App() {
  let url = window.location.pathname


  let page = (url === "/") ? appPage() : trackerPage();
  console.log(page)

  return (
    <div>

      {page}
      </div>

  );
}

export default App;

import React from 'react';
 
import appPage from './appPage/appPage';
import trackerPage from './trackerPage/trackerPage';
import signInPage from './signIn/signInPage'


function App() {
  let url = window.location.pathname

  console.log(document.cookie);


  var page;

  if(url === "/"){
    if (document.cookie === ""){
      page = signInPage();
    }else{
      page = appPage();
    }
  }else{
    page = trackerPage();
  }

    
    
  console.log(page)



  return (
    <div>
      {page}
      </div>

  );
}

export default App;

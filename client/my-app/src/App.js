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
      page = appPage();
    }else{
      page = appPage();
    }
  }else{
    page = trackerPage();
  }

    
    
  console.log(page)



  return (<>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@700&family=Inter:wght@300;400;500;600;700&family=Roboto&display=swap" rel="stylesheet" /> 
    </head>
    <div>
      {page}
      </div>
  </>

  );
}

export default App;

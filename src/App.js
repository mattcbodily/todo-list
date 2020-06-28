import React from 'react';
import Header from './Components/Header/Header';
import routes from './routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
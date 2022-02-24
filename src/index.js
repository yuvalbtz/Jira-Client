import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {MemoryRouter} from 'react-router-dom'
import {createMemoryHistory} from 'history'
const history = createMemoryHistory();
ReactDOM.render(
  <React.StrictMode>
   <MemoryRouter>
   <App />
   </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();

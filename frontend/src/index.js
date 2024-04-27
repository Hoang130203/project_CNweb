import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Fake comments
function emitComment(id) {

  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`product-${id}`, {
        detail: `Nội dung comment của product ${id}`
      })
    )
  }, 2000)

}

emitComment(1);
emitComment(2);
emitComment(3);
emitComment(4);
emitComment(5);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

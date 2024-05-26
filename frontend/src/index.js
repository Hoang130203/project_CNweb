import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById('root'));
export const LoadingContext = createContext();

const { Provider } = LoadingContext;

export const LoadingProvider = (props) => {
  const [loading, setLoading] = useState(false);
  return (
    <Provider value={[loading, setLoading]}>
      {props.children}
    </Provider>
  )
}
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

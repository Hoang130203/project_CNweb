import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes/index'
import DefaultLayout from './Layout/DefaultLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBox from './components/ChatBox/ChatBox';

function App() {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          let layout = route.layout
          const Layout = layout ? layout : DefaultLayout
          return (
            <Route key={index} path={route.path} element={
              <Layout>
                <ToastContainer position='bottom-right' />
                <Page></Page>
              </Layout>
            }>

            </Route>
          )
        })}
      </Routes>
    </Router>
  );
}

export default App;

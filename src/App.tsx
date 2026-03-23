import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CommonWrapper } from './wrappers/CommonWrapper';
import { AuthWrapper } from './wrappers/AuthWrapper';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Layout } from './pages/Layout';
import { FeedPage } from './pages/FeedPage';


function App() {

    return (
      <Provider store={store}>
        <CommonWrapper>
          <Router>
            <AuthWrapper>
              <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />

                <Route path='/feed' element={<Layout />}>
                  <Route index element={<FeedPage />} />
                </Route>
              </Routes>
            </AuthWrapper>
          </Router>
        </CommonWrapper>
      </Provider>
    )

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

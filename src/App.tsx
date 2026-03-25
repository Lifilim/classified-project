import './App.css';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CommonWrapper } from './wrappers/CommonWrapper';
import { AuthWrapper } from './wrappers/AuthWrapper';

import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { Layout } from './components/Layout';
import { FeedPage } from './pages/FeedPage';
import { NoPage } from './pages/NoPage';


function App() {
    return (
      <div> 
      <Provider store={store}>
        <CommonWrapper>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/login' element={<SignInPage />} />
              <Route path='/register' element={<SignUpPage />} />

              <Route element={<AuthWrapper children />}>
                <Route path='/feed' element={<Layout />}>
                  <Route index element={<FeedPage />} />
                </Route>

              </Route>
              
              <Route path='*' element={<NoPage />} /> 
            </Routes>
          </Router>
        </CommonWrapper>
      </Provider>
      </div>
    )
}

export default App;

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
import { Layout } from './components/Layout';
import { FeedPage } from './pages/FeedPage';


function App() {

    return (
      <div> 
      <Provider store={store}>
        <CommonWrapper>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
      </div>
    )
}

export default App;

import './App.css';
import './ui/global.css';

import { Provider } from 'react-redux';
import { store } from './stores/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CommonWrapper } from './wrappers/CommonWrapper';
import { AuthWrapper } from './wrappers/AuthWrapper';

import { LandingPage } from './pages/LandingPage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { AppLayout } from './components/AppLayout';
import { FeedPage } from './pages/FeedPage';
import { NoPage } from './pages/NoPage';

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { ProfilePage } from './pages/ProfilePage';

const theme = createTheme({});

function App() {
  return (
    <div>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <CommonWrapper>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <AuthWrapper>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route path='/' element={<LandingPage />} />

                    <Route path='/login' element={<SignInPage />} />
                    <Route path='/register' element={<SignUpPage />} />

                    <Route path='/feed' element={<FeedPage />}/>
                    <Route path='/profile' element={<ProfilePage />} />
                  </Route>
                  <Route path='*' element={<NoPage />} />
                </Routes>
              </AuthWrapper>
            </Router>
          </CommonWrapper>
        </MantineProvider>
      </Provider>
    </div>
  )
}

export default App;

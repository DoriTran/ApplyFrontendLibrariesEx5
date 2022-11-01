import LoginPage from './Component/LoginPage/LoginPage'
import SignupPage from './Component/SignupPage/SignupPage'
import ProfilePage from './Component/ProfilePage/ProfilePage'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="profile/:username" element={<ProfilePage />} />

        <Route path="*" element={<Navigate replace to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

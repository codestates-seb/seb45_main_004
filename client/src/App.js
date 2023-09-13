import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'; // BrowserRouter 등의 라우터 컴포넌트 임포트
import HomePage from './pages/HomePage';
import InvitePage from './pages/InvitePage';
import Header from './components/Header';
import Footer from './components/Footer';
import MyPage from './pages/MyPage';
import InviteWritePage from './pages/InviteWritePage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Kakao from './pages/KakaoRedirect';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="boards/new-boards" element={<InviteWritePage />} />
        <Route path="/boards/:boardId" element={<InvitePage />} />
        <Route path="/members/:memberId" element={<MyPage />} />
        <Route path="/members/login" element={<LoginPage />} />
        <Route path="/members/" element={<SignupPage />} />
        <Route path="oauth/kakao/login" element={<Kakao />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

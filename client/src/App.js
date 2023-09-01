import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'; // BrowserRouter 등의 라우터 컴포넌트 임포트
import HomePage from './pages/HomePage';
import InvitePage from './pages/InvitePage';
import Header from './components/Header';
import Footer from './components/Footer';
import MyPage from './pages/MyPage';
import MapKakao from './services/MapKakao';

function App() {
  return (
    <BrowserRouter>
      <MapKakao />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:boardId" element={<InvitePage />} />
        <Route path="/members/1" element={<MyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

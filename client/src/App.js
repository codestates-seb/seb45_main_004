// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // BrowserRouter 등의 라우터 컴포넌트 임포트
import HomePage from './pages/HomePage';
import InvitePage from './pages/InvitePage';

function App() {
  return (
    <BrowserRouter>
      {' '}
      {/* BrowserRouter로 앱 전체 감싸기 */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/boards/:boardId" element={<InvitePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

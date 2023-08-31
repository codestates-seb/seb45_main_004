import './App.css';
//COMPONENTS
import Footer from './components/Footer';
import Header from './components/Header';
import Homepage from './pages/HomePage';
import InvitePage from './pages/InvitePage';

function App() {
  return (
    <>
      <Header />
      <Homepage />
     <InvitePage />;
      <Footer />
    </>
  );
}

export default App;

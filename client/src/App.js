import './App.css';
//COMPONENTS
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <div className="content-body">
        <div>
          <h2>Hello World!</h2>
        </div>
        <div>
          <a href="/">HOME</a>
        </div>
        <div>
          <a href="/login">LOGIN</a>
        </div>
        <div>
          <a href="/users/new-user">SIGNUP</a>
        </div>
        <div>
          <a href="/posts/1">1st Post</a>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;

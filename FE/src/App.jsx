import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Join from './pages/Join/Join';
import Diary from './pages/Diary/Diary';
import Header from './components/Common/Header';
import MyPage from './pages/MyPage/MyPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div id='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/join' element={<Join />} />
            <Route path='/diary' element={<Diary />} />
            <Route path='/myPage' element={<MyPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

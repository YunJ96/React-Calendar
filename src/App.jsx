import Login from './pages/Login/Login';
import Diary from './pages/Diary/Diary';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <div id='container'>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/diary' element={<Diary />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

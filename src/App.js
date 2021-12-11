// import logo from './logo.svg';

import './App.css';
import { AddClubForm, Main, ClubDetail } from './pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/addclub" element={<AddClubForm />} />
        <Route path="/clubdetail/:row" element={<ClubDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

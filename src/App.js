import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateClass } from './components/CreateClass';
import { AddMembers } from './components/AddMembers';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateClass />} />
        <Route path="/members" element={<AddMembers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

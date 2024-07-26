import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Reciever from './components/Reciever';
import Sender from './components/Sender';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender />}></Route>
        <Route path="/reciever" element={<Reciever />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

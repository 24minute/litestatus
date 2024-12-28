import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<UserRoutes />}></Route>
        <Route path="/admin/*" element={<AdminRoutes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

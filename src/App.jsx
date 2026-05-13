import './App.css';
import Registration from './pages/Registration';
import { Route, Routes, useLocation } from 'react-router';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Carts from './pages/Carts';

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/signin"];
  const hideLayout =  hideLayoutRoutes.includes(location.pathname);

  return (
    <div className="App">
        {!hideLayout &&  <Header/>}
        <Routes>
          <Route path='/' element={<ProtectedRoutes allowedRoles={['admin', 'customer']}>
            <Dashboard/>
          </ProtectedRoutes>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/signin' element={<Registration/>}></Route>
          <Route path='/cart' element={<ProtectedRoutes allowedRoles={['admin', 'customer']} >
            <Carts/>
          </ProtectedRoutes>}></Route>
        </Routes>
        {!hideLayout && <Footer/>}
    </div>
  );
}

export default App;

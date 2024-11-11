import './App.css';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import { Routes, Route } from 'react-router-dom';
function App() {
  return (
      <Routes>
        <Route path='/auth/register' element={<RegisterForm />} />
        <Route path='/auth/login' element={<LoginForm/>}/>
      </Routes>
  );
}

export default App;

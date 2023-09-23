import ReactDOM from 'react-dom/client';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Nopage from './components/Nopage';


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Login />}/>
      <Route path='/signup' element={<Register />}/>
      <Route path='/home' element={<Home />}/>
      
      <Route path='*' element={<Nopage />}/>
    </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)



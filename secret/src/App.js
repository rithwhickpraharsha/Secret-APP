import './App.css'
import Signup from "./components/Signup"
import Login from './components/Login';
import View from './components/View';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import YourSecret from './components/YourSecret';
import Post from './components/Post';
import Category from './components/Category';
export default function App() {
  return (
    <Router>
     <Routes>
      <Route exact path='/signup' element={<Signup />}/>
      <Route exact path='/' element={<Login />}/>
      <Route exact path='/App' element={<View />}/>
      <Route exact path = '/App/Your-secret' element={<YourSecret/>} />
      <Route exact path = '/App/post' element={<Post/>} />
      <Route exact path = '/App/Category/:title' element= {<Category/>} />

     </Routes>

    </Router>
  
  )
}
import './App.css'
import { Routes, Route, Link } from "react-router-dom"
import Home from './Components/Home'
import Login from './Components/Login'
import Recipes from './Components/Recipes'
import Favorites from './Components/Favorites'
import RecipeDetail from './Components/RecipeDetails'
import SignUp from './Components/SignUp'

function App() {
  

  return (
    <>
      <div>
      <div id="navbar">
        
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/recipes">Recipes</Link>

      </div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
     
      

      </div>
    </>
  )
}

export default App

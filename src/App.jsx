import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Recipes from "./Components/Recipes";
import Favorites from "./Components/Favorites";
import RecipeDetail from "./Components/RecipeDetails";
import SignUp from "./Components/SignUp";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  return (
    <div>
      <nav id="navbar">
        <Link to="/">Home</Link>
        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/signup">Sign Up</Link>}
        <Link to="/recipes">Recipes</Link>
        {token && <Link to="/favorites">Favorites</Link>}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !token ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/favorites" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={!token ? <SignUp /> : <Navigate to="/recipes" replace />}
        />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route
          path="/favorites"
          element={token ? <Favorites /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

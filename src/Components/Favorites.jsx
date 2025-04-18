import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  if (favorites.length === 0) {
    return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <h2>No favorites found.</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>Favorites</h1>
      <button onClick={handleLogout}>Log Out</button>
      <div className="recipes-container">
        {favorites.map((r) => (
          <RecipeCard
            key={r.id}
            id={r.id}
            name={r.name}
            photo={r.photo}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
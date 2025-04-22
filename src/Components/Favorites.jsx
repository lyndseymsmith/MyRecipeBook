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
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRemove = (id) => {
    const updated = favorites.filter((r) => r.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  if (favorites.length === 0) {
    return (
      <div>
        <button onClick={handleLogout}>Log Out</button>
        <h2>No favorites found.</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Favorites</h1>
      <button onClick={handleLogout}>Log Out</button>
      <div className="recipes-container">
        {favorites.map((r) => (
          <div key={r.id} style={{ position: "relative", margin: "1rem" }}>
            <RecipeCard id={r.id} name={r.name} photo={r.photo} />
            <button
              onClick={() => handleRemove(r.id)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "#ff6b6b",
                border: "none",
                color: "#fff",
                padding: "0.3rem 0.6rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;

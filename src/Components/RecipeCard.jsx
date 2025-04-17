import { useNavigate } from "react-router-dom";

function RecipeCard({ name, photo, id }) {
    const navigate = useNavigate();

    const handleViewRecipe = () => {
        navigate(`/recipe/${id}`);
    }

    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const recipe = {
            name: name,
            photo: photo,
            id: id,
        };
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    const recipe = {
        name: name,
        photo: photo,
        id: id,
    };

  return (
    <>
      <div className="recipe-card">
        <img
          src={photo}
          alt={name}
          style={{ height: "200px", width: "100%" }}
        />
        <h2>{name}</h2>
        <button onClick={() => handleViewRecipe(recipe)}>View Recipe</button>
        <button onClick={() => handleFavorite(recipe)}>Favorite</button>
      </div>
    </>
  );
}

export default RecipeCard;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(
          `https://fsa-recipe.up.railway.app/api/recipes/${id}`
        );
        if (!res.ok) throw new Error("Error fetching recipe details.");
        const data = await res.json();
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Loading recipe details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>No recipe details available.</p>;

  return (
    <div>
      <h2>{recipe.strMeal}</h2>
      {recipe.strMealThumb && (
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          style={{width: "400px", height: "100%" }}
        />
      )}
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetail;

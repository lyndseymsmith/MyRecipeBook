import RecipeCard from "./RecipeCard";
import { useEffect, useState } from "react";

function Recipes({ recipe }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(
          "https://fsa-recipe.up.railway.app/api/recipes"
        );

        const data = await res.json();
        console.log(data);

        setRecipes(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchRecipes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recipes-container">
      {recipes.map((recipe) => (
        <RecipeCard
        key={recipe.idMeal}
        id={recipe.idMeal}
        name={recipe.strMeal}  
        photo={recipe.strMealThumb}
         />
      ))}
    </div>
  );
}

export default Recipes;

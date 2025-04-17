import { useState } from "react";

function SignUp() {
  const [username, setUserName] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [error, setError] = useState(null);
  const [validateMessage, setValidateMessage] = useState("");
 

  async function handleSubmit(event) {
    event.preventDefault();
    //console.log("Submitting form...")

    if (password.trim().length < 6) {
      setValidateMessage("Password must be at least 6 characters long.");
      return;
    }
    setValidateMessage("");

    try {
      const response = await fetch(
        "https://fsa-recipe.up.railway.app/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const result = await response.json();
      console.log("Result", result);
      // Store in local storage
        localStorage.setItem("token", result.token);
    } catch (error) {
      console.log("Error signing up", error);
      setError(error.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
        {validateMessage && <p style={{ color: "red" }}>{validateMessage}</p>}
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default SignUp;
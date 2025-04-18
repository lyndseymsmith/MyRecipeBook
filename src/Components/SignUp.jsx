import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validateMessage, setValidateMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    //console.log("Submitting form...")

    const cleanUsername = username.trim();
    if (cleanUsername.length === 0) {
      setValidateMessage("Username can't be blank.");
      return;
    }
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
            "Content-Type": "application/json",},
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Signup failed");
      }
      const { token } = await response.json();
      localStorage.setItem("token", token);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username:{""}
          <input
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Password:{""}
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

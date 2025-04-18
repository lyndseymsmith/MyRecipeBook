import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Login( { onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault();
      try {
        const res = await fetch("https://fsa-recipe.up.railway.app/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username.trim(),
            password,
          }),
        });
    
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || "Login failed");
        }
    
        const { token } = await res.json();
        onLogin(token);
        localStorage.setItem("token", token);
        navigate("/recipes");


      } catch (error) {
        setError(error.message);
      }
    }


  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button type="submit">Login</button>
      </form>

      <div>
        <h3>Don't have an account?</h3>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Login;
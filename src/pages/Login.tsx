import React, { useState } from "react";
import { login } from "../services/authService";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      alert("Login successful!");
    } catch (err: any) {
      console.error("Login Error: ", err);
      setError(err.message || "Login failed.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{String(error)}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

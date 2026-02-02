import React, { useState } from "react";
import supabase from '../config/supabaseClient'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("User")
      .select("*")
      .eq("usr_email", email)
      .eq("usr_password", password)
      .single();

    if (error) {
      alert("Invalid email or password");
    } else {
      alert(`Welcome ${data.usr_name}`);
      console.log("User:", data);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

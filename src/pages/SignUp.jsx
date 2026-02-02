import React, { useState } from "react";
import supabase from '../config/supabaseClient'

const Signup = () => {
  const [formData, setFormData] = useState({
    usr_name: "",
    usr_email: "",
    usr_password: "",
    usr_contact: "",
    usr_age: "",
    usr_gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("User").insert([
      {
        ...formData,
        usr_status: true,
        usr_role: "buyer", // default role
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form onSubmit={handleSignup}>
        <input name="usr_name" placeholder="Name" onChange={handleChange} required />
        <input name="usr_email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="usr_password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="usr_contact" placeholder="Contact Number" onChange={handleChange} />
        <input name="usr_age" placeholder="Age" onChange={handleChange} />
        <input name="usr_gender" placeholder="Gender" onChange={handleChange} />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

import { Link } from "react-router-dom"
import '../styles/login.module.css'
import { useState } from "react";
import Error from "../components/common/Error/Error";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Login() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const validate = () => {
    if(formData.email && formData.password) {
      return true;
    } else {
      setError("Please enter all the required fields")
    }

    return false;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (e) {
      setError(e.message);
    }
  }

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <main>
        <h1>Login</h1>

        {error && (
          <Error error={error} />
        )}

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Please Enter Email" onChange={handleChange} value={formData.email} />
          <input name="password" type="password" placeholder="Please Enter Password" onChange={handleChange} value={formData.password} />
          <p>Don&apos;t have an account yet? <Link to={"/register"}>Register Here.</Link></p>
          <button>Login</button>
        </form>
    </main>
  )
}

export default Login
import { Link } from "react-router-dom"
import '../styles/login.module.css'
import { useState } from "react";
import Error from "../components/common/Error/Error";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function Register() {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const validate = () => {
    let flag = false;
    if(formData.email && formData.password && formData.confirmPassword) {
      flag = true;
    } else {
      flag = false;
      setError("Please enter all the required fields")
    }

    if(formData.confirmPassword === formData.password) {
      flag = true;
    } else {
      flag = false;
      setError("Passwords do not match")
    }

    return flag;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    } catch (e) {
      setError(e.message);
    }
  }

  const handleChange = (e) => {
    setError("")
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }

  return (
    <main>
        <h1>Register</h1>

        {error && (
          <Error error={error} />
        )}

        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Please Enter Email" value={formData.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Please Enter Password" value={formData.password} onChange={handleChange} />
          <input name="confirmPassword" type="password" placeholder="Please Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
          <p>Already have an account? <Link to={"/login"}>Login Here.</Link></p>
          <button>Register</button>
        </form>
    </main>
  )
}

export default Register
import { Link } from "react-router-dom"
import './style.module.css'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../../firebaseConfig"
import { signOut } from "firebase/auth";

function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
  }

  return (
    <nav>
      <Link to={"/"}>Home</Link>
      <Link to={"/about"}>About</Link>
      <Link to={"/cart"}>Cart</Link>
      {user ? 
        <>
          <Link to={"/profile"}>Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
        :
        <Link to={"/login"}>Login</Link>
      }
      
    </nav>
  )
}

export default Navbar
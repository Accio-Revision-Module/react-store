/* eslint-disable react-hooks/exhaustive-deps */
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import { Suspense, useEffect } from 'react'
import Loading from './components/common/Loading/Loading'
import lazyLoad from './lazyLoad'
import Navbar from './components/common/Navbar/Navbar'
import UserProvider from './context/UserContext'
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute'
import { useDispatch } from 'react-redux'
import { fetchCart } from './store/actions/cartActions'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebaseConfig'

const Home = lazyLoad("./pages/home");
const About = lazyLoad("./pages/about");
const Cart = lazyLoad("./pages/cart");
const Login = lazyLoad("./pages/login");
const Register = lazyLoad("./pages/register");
const Profile = lazyLoad("./pages/profile");

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(user)
      dispatch(fetchCart());
  }, [user])
  
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </UserProvider>
      </Router>
    </Suspense>
  )
}

export default App

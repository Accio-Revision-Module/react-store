import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../firebaseConfig"
import Loading from "../components/common/Loading/Loading";

function Profile() {
  const [user, loading] = useAuthState(auth);

  if(loading) {
    return <Loading />
  }

  return (
    <main>
        <h1>Profile</h1>
        <p>ID: {user.uid}</p>
        <p>Email: {user.email}</p>
    </main>
  )
}

export default Profile
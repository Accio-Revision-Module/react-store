import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../../firebaseConfig"
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading/Loading";

function PrivateRoute() {
    const [user, loading] = useAuthState(auth);

    if(loading) {
        return <Loading />
    }

    if(user) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"} />
    }
}

export default PrivateRoute
import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./context/UserContext";


const Rute = ({ allowedRoles }) => {

    const { user } = useContext(UserContext)
    const location = useLocation();

    return (
        user?.tip == 'Trener'
            ? <Outlet />
            : <Navigate to="/pocetna" state={{ from: location }} replace />
    );
}

export default Rute;
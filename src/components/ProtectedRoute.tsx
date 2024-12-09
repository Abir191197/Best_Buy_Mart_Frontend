import { ReactNode } from "react";

import { logout, TUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { verifyToken } from "../utils/verifyToken";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  role: string;
}

const ProtectedRoute = ({ children,role }: ProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken);

  let user: TUser | null = null;
if (token) {
  user = verifyToken(token)
  
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== (user)?.role) {
    dispatch(logout());
     return <Navigate to="/login" replace={true} />;

  }
  


  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;

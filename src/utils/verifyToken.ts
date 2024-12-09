import {jwtDecode} from "jwt-decode";
import { TUser } from "../redux/features/auth/authSlice";

export const verifyToken = (token: string): TUser | null => {
  try {
    // Decode token and cast to TUser type
    return jwtDecode<TUser>(token);
  } catch (error) {
    return null;
  }
};

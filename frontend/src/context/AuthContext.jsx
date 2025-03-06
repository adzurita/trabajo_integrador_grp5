import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, getProfile } from "../services/productService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    if (!response) {
      return;
    }
    let token;
    if (response?.token) {
      token = response.token;
      localStorage.setItem("token", token);
      const profile = await getProfile(token);
      console.log("🚀🚀🚀🚀🚀profile:", profile);
      const { firstname, lastname, email } = profile;
      const initials = `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

      const user = {
        name: `${firstname} ${lastname}`,
        email,
        avatar: initials,
        isAdmin: profile.role === "SUPERADMIN"
      };

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
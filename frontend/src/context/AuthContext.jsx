import { createContext, useState, useEffect } from "react";
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

  const profile = async (token) => {
    try {
      const profile = await getProfile(token);
      console.log("🚀 ~ login ~ profile:", profile);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    if (!response) {
      return;
    }
    let token 
    if (response?.token) {
       token = response.token;
      localStorage.setItem("token", token);
      profile(token);
    }
/*     const profile = await getProfile(token);
    console.log("🚀 ~ login ~ profile:", profile); */
/* 
        const fakeUser = { name: "Juan Pérez", email, avatar: "JP" };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);  */
  };



  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user:undefined, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

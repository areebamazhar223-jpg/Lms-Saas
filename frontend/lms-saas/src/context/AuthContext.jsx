import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// ======================================
// CHECK AUTHENTICATION
// ======================================

useEffect(() => {
const checkAuth = () => {
try {
const token = localStorage.getItem("token");
const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  } catch (error) {
    console.error("Auth Error:", error);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  } finally {
    setLoading(false);
  }
};

checkAuth();

}, []);

// ======================================
// LOGIN
// ======================================

const login = async (email, password) => {
try {
const response = await api.post("/auth/login", {
email,
password,
});

  const data = response.data;

  if (!data.success) {
    throw new Error(
      data.message || "Login failed."
    );
  }

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );

  setUser(data.user);

  return data;
} catch (error) {
  console.error("Login Error:", error);

  throw new Error(
    error.response?.data?.message ||
      error.message ||
      "Login failed."
  );
}

};

// ======================================
// REGISTER
// ======================================

const register = async (
name,
email,
password
) => {
try {
const response = await api.post(
"/auth/register",
{
name,
email,
password,
}
);

  const data = response.data;

  if (!data.success) {
    throw new Error(
      data.message ||
        "Registration failed."
    );
  }

  return data;
} catch (error) {
  console.error(
    "Register Error:",
    error
  );

  throw new Error(
    error.response?.data?.message ||
      error.message ||
      "Registration failed."
  );
}

};

// ======================================
// LOGOUT
// ======================================

const logout = () => {
localStorage.removeItem("token");
localStorage.removeItem("user");

setUser(null);

};

// ======================================
// CONTEXT PROVIDER
// ======================================

return (
<AuthContext.Provider
value={{
user,
loading,
login,
register,
logout,
}}
>
{children}
</AuthContext.Provider>
);
};

// ======================================
// USE AUTH HOOK
// ======================================

export const useAuth = () => {
const context = useContext(AuthContext);

if (!context) {
throw new Error(
"useAuth must be used inside AuthProvider"
);
}

return context;
};
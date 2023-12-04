import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [rerenderkey, setRerenderKey] = useState("");
  //Registration Context

  const [formFields, setFormFields] = useState({
    // displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const setUser = (email, name) => {
    setUserEmail(email);
    setDisplayName(name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("displayName", name);
  };

  useEffect(() => {
    const storedUserEmail = localStorage.getItem("userEmail");
    const storedDisplayName = localStorage.getItem("displayName");

    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    }

    if (storedDisplayName) {
      setDisplayName(storedDisplayName);
    }
  }, []);

  const logoutUser = () => {
    setUserEmail("");
    setDisplayName("");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("displayName");
    toast(`User Logout done`, "error");
  };

  const localStorageEmail = localStorage.getItem("userEmail");

  return (
    <UserContext.Provider
      value={{
        userEmail,
        displayName,
        setUser,
        formFields,
        setFormFields,
        logoutUser,
        localStorageEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

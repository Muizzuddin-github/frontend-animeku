import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <UserContext.Provider value={[username, setUsername]}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.object,
};

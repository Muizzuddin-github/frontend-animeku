import Auth from "../api/auth";
import Spinner from "../components/Spinner";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../hooks/ContextProvider";
import { useNavigate } from "react-router-dom";

const IsNotLogin = ({ children }) => {
  const [isNotLogin, setIsNotLogin] = useState(false);
  const [, setUsername] = useContext(UserContext);
  const [internalServerError, setInternalServerError] = useState("");

  const redirect = useNavigate();

  useEffect(
    function () {
      Auth.isLogin()
        .then((res) => {
          setIsNotLogin(true);

          setUsername(res.data.username);
          redirect("/dashboard");
        })
        .catch((err) => {
          if (err.response.status === 403) {
            setIsNotLogin(true);
          } else {
            setInternalServerError(err.message);
          }
        });
    },
    [setUsername, redirect]
  );

  return internalServerError ? (
    <section className="flex justify-center items-center h-[100vh] text-red-500 text-xl">
      <p>{internalServerError}</p>
    </section>
  ) : isNotLogin ? (
    children
  ) : (
    <section className="h-[100vh] flex justify-center items-center">
      <Spinner w="w-10" h="h-10" />
    </section>
  );
};

export default IsNotLogin;

IsNotLogin.propTypes = {
  children: PropTypes.object,
};

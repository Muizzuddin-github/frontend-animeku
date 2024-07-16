import Auth from "../api/auth";
import Spinner from "../components/Spinner";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../hooks/ContextProvider";
import { useNavigate } from "react-router-dom";

const IsNotLogin = ({ children }) => {
  const [isNotLogin, setIsNotLogin] = useState(false);
  const [, setUsername] = useContext(UserContext);

  const redirect = useNavigate();

  useEffect(
    function () {
      Auth.isLogin().then((res) => {
        setIsNotLogin(true);

        setUsername(res.data.username);
        redirect("/dashboard");
      });
    },
    [setUsername, redirect]
  );

  return isNotLogin ? (
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

import { Link } from "react-router-dom";
import Auth from "../api/auth";
import { useState } from "react";
import { useRef } from "react";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);

  const [loginError, setLoginError] = useState({
    txt: "",
    color: "",
    show: "-translate-x-full",
    txtColor: "",
  });

  const form = useRef(null);
  const redirect = useNavigate();

  const btnLogin = async (e) => {
    try {
      e.preventDefault();
      setBtnDisable(true);
      setBtnLoading(true);

      await Auth.login({
        email: email,
        password: password,
      });

      setTimeout(() => {
        setLoginError({
          txt: "Berhasil Login",
          color: "bg-green-100",
          show: "",
          txtColor: "text-green-800",
        });
        setBtnLoading(false);

        setTimeout(() => {
          redirect("/dashboard");
        }, 1500);
      }, 1000);
    } catch (err) {
      setTimeout(() => {
        setBtnDisable(false);
        setBtnLoading(false);
        setLoginError({
          txt: err.response.data.errors.join(""),
          color: "bg-red-100",
          show: "",
          txtColor: "text-red-800",
        });
      }, 1000);
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <main className="h-[100vh] flex justify-center items-center p-10">
        <section className="w-full max-w-[500px]">
          <p className="text-center mb-2 font-semibold text-xl">
            Silahkan Login
          </p>
          <section className="overflow-hidden h-14 mb-2">
            <section
              className={`p-4 text-sm ${loginError.txtColor} rounded-lg ${loginError.color} ${loginError.show} duration-700`}
              role="alert"
            >
              <span className="font-medium">{loginError.txt}</span>
            </section>
          </section>

          <form ref={form} onSubmit={btnLogin} className="w-full ">
            <section className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>
            <section className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                required
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
            <section className="flex justify-between items-center">
              <button
                type="submit"
                disabled={btnDisable}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {btnLoading ? <Spinner w="w-8" h="h-5" /> : "Login"}
              </button>

              <Link
                to={btnDisable ? "/" : "/register"}
                className="underline text-gray-700 text-sm"
              >
                Belum punya akun ?
              </Link>
            </section>
          </form>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Login;

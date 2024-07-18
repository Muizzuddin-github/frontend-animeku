import { useState } from "react";
import Auth from "../api/auth";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [btnLoading, setBtnLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [btnLoadingOtp, setBtnLoadingOtp] = useState(false);
  const [btnDisableOtp, setBtnDisableOtp] = useState(false);

  const inputsOtp = useRef(null);
  const formInputOtp = useRef(null);
  const form = useRef(null);

  const redirect = useNavigate();

  const [registerError, setRegisterError] = useState("");
  const [registerSaveError, setRegisterSaveError] = useState("");

  const handleInputOtp = (e) => {
    if (e.target.value !== "") {
      if (isNaN(e.target.value)) {
        e.target.value = "";
      } else {
        e.target.nextElementSibling?.focus();
      }
    }
  };

  const handleInputOtpBackspace = (e) => {
    if (e.key === "Backspace") {
      e.target.value = "";
      e.target.previousElementSibling?.focus();
    } else if (e.key === "ArrowRight") {
      e.target.nextElementSibling?.focus();
    } else if (e.key === "ArrowLeft") {
      e.target.previousElementSibling?.focus();
    }
  };

  const handleInputOtpPaste = (e) => {
    const valuePaste = e.clipboardData.getData("text");
    if (valuePaste.length === 6) {
      const inputChild = inputsOtp.current.children;
      if (!isNaN(valuePaste)) {
        for (let i = 0; i < inputChild.length; i++) {
          inputChild[i].value = valuePaste[i];
        }
      } else {
        for (let i = 0; i < inputChild.length; i++) {
          inputChild[i].value = "";
        }
      }
    }
  };

  const btnRegister = async (e) => {
    try {
      e.preventDefault();
      setBtnLoading(true);
      setRegisterError("");

      await Auth.register({
        username,
        email,
        password,
      });

      setBtnLoading(false);
      setShowOtpModal(true);
      form.current.reset();
    } catch (err) {
      setBtnLoading(false);
      setRegisterError(err.response.data.errors.join(""));
    }
  };

  const btnOtp = async (e) => {
    try {
      setBtnLoadingOtp(true);
      setBtnDisableOtp(true);
      setRegisterSaveError("");

      e.preventDefault();

      const otpCode = Array.from(inputsOtp.current.children)
        .map((e) => e.value)
        .join("");

      await Auth.registerSave(otpCode);
      setTimeout(() => {
        formInputOtp.current.reset();
        setBtnLoadingOtp(false);
        setTimeout(() => {
          redirect("/");
        }, 1000);
      }, 1000);
    } catch (err) {
      setBtnLoadingOtp(false);
      setBtnDisableOtp(false);
      setRegisterSaveError(err.response.data.errors.join(""));
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Daftar</title>
      </Helmet>
      <main>
        {showOtpModal ? (
          <section className=" layar-hitam flex justify-center items-center  fixed w-full h-[100vh]">
            <section className="bg-white w-full py-5">
              {registerSaveError ? (
                <p className="text-center font-semibold text-red-500">
                  {registerSaveError}
                </p>
              ) : (
                <p className="text-center font-semibold">Masukkan Kode Otp</p>
              )}
              <form
                ref={formInputOtp}
                className="flex flex-col gap-10 justify-center items-center bg-white py-5 w-full"
                onSubmit={btnOtp}
              >
                <section
                  ref={inputsOtp}
                  className="w-full flex justify-center gap-4 p-5 text-black"
                >
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                  <input
                    type="text"
                    className="border w-10 rounded-md text-center"
                    onChange={handleInputOtp}
                    onKeyDown={handleInputOtpBackspace}
                    onPaste={handleInputOtpPaste}
                    maxLength={1}
                    required
                  />
                </section>

                <section className="flex gap-20">
                  <button
                    type="submit"
                    disabled={btnDisableOtp}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center w-fit"
                  >
                    {btnLoadingOtp ? <Spinner w="w-8" h="h-5" /> : "Kirim"}
                  </button>

                  <button
                    type="button"
                    disabled={btnDisableOtp}
                    onClick={() => {
                      setShowOtpModal(false);
                      setRegisterSaveError("");
                    }}
                  >
                    Kembali
                  </button>
                </section>
              </form>
            </section>
          </section>
        ) : (
          ""
        )}

        <section className="h-[100vh] flex flex-col justify-center items-center p-10">
          <p className="mb-10 font-semibold text-xl">Silahkan Daftar</p>
          <form
            ref={form}
            className="w-full max-w-[500px]"
            onSubmit={btnRegister}
          >
            <section className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </section>
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

            <section className="flex justify-between items-start gap-4">
              <button
                type="submit"
                disabled={btnLoading}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {btnLoading ? <Spinner w="w-5" h="h-5" /> : "Daftar"}
              </button>

              <p className="text-sm text-red-500">{registerError}</p>
            </section>
          </form>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Register;

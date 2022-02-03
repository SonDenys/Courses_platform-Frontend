import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import konsole from "../../../konsole";
import { BACKEND_URL } from "../../../params";
import { useMyToast } from "../../../_GlobalStates/hooks";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { create_user } from "../helpers";
// import  FileClient  from "../../signalx-js/file_client";
// export interface InvitedProps {
//   admin_id: string;
//   organization_id: string;
//   emailInvited: string;
//   code: string;
// }

export default function AdminSignup() {
  const { t } = useTranslation();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [scopes, setScopes] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorFieldRequired, setFieldRequired] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorField, setErrorField] = useState(false);

  const toast = useMyToast();
  const navigate = useNavigate();

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const result = await create_user({
        username,
        password,
        email,
        scopes: "admin",
      });

      if (_.size(result)) {
        // const _id = result["_id"]
        toast.info(t("user_creation_successful"));
        navigate("/", { replace: true });
      } else if (password !== confirmPassword) {
        setErrorPassword(true);
        setErrorPasswordMessage("⚠️ Your password are not the same");
      } else if (
        firstname.length <= 0 ||
        lastname.length <= 0 ||
        lastname.length <= 0 ||
        email.length <= 0 ||
        password.length <= 0
      ) {
        setErrorField(true);
        setFieldRequired("⚠️ At least one field is missing");
      } else {
        // throw "asdasd";
        toast.error(t("could_not_create_user"));
      }
    } catch (e) {
      konsole.error(`Could not signup ${e}`);
      toast.error(t("could_not_create_user"));
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Or{" "}
              <Link
                to={`/login`}
                // href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                connect to your account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="firstname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Firstname
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstname"
                      name="firstname"
                      type="firstname"
                      autoComplete="firstname"
                      required
                      onChange={(event) => setFirstName(event.target.value)}
                      value={firstname}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    lastname
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastname"
                      name="lastname"
                      type="lastname"
                      autoComplete="lastname"
                      required
                      onChange={(event) => setLastName(event.target.value)}
                      value={lastname}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    username
                  </label>
                  <div className="mt-1">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      autoComplete="username"
                      required
                      onChange={(event) => setUserName(event.target.value)}
                      value={username}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                {/* <div>
                  <label
                    htmlFor="scopes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    scopes
                  </label>
                  <div className="mt-1">
                    <input
                      id="scopes"
                      name="scopes"
                      type="scopes"
                      autoComplete="scopes"
                      required
                      onChange={(event) => setScopes(event.target.value)}
                      value={scopes}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div> */}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      onChange={(event) => setEmail(event.target.value)}
                      value={email}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(event) => setPassword(event.target.value)}
                      value={password}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      value={confirmPassword}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleSignup}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Sign in
                  </button>
                </div>
                <p className="text-red-700">{errorPasswordMessage}</p>
                <p className="text-red-700">{errorFieldRequired}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="bg-cube.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

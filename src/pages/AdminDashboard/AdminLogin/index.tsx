import { LockClosedIcon } from "@heroicons/react/solid";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { config_urlencode, setLocalData } from "../../../utils";
import { useRecoilState } from "recoil";
import {
  emailStateSender,
  signUserIdState,
} from "../../../_GlobalStates/globalState";
import { prepare_query } from "../../../utils";
import konsole from "../../../konsole";
import {
  CreateTokenCache,
  getPayloadValue,
  initSignalXClient,
  isAuthenticated,
} from "../../../Auth";
import { access } from "fs";
import { useTranslation } from "react-i18next";
import { BACKEND_URL } from "../../../params";

export default function AdminLogin() {
  const [email, setEmail] = useRecoilState(emailStateSender);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signedUserId, setSignedUserId] = useRecoilState(signUserIdState);
  const { t } = useTranslation();

  const navigate = useNavigate();

  if (isAuthenticated()) {
    navigate("/admin/home");
  }

  const login = async (data: any) => {
    const urlSignin = `/auth/signin`;

    try {
      const query: any = prepare_query(
        {
          user_id: signedUserId,
        },
        true
      );
      let result: any = {};
      konsole.log(`urlSignin ===== ${urlSignin}`);
      konsole.log(`BACKEND_URL ===== ${BACKEND_URL}`);
      try {
        result = await axios.post(
          `${BACKEND_URL}${urlSignin}`,
          data,
          config_urlencode as any
        );
      } catch (e) {
        console.log(`Could not signin: ${e}`);
      }
      console.log("result result result result result result result result ");
      console.log("result result result result result result result result ");
      console.log("result login ====", result.data);
      console.log("result result result result result result result result ");
      console.log("result result result result result result result result ");

      if (result.data) {
        const d: any = result.data;
        //set the state of the organizations data
        const access_token: string = d.access_token;
        const refresh_token: string = d.refresh_token;

        await initSignalXClient(access_token, refresh_token, data.password);
        await CreateTokenCache({ access_token, refresh_token });

        // create siglnalx client
        // setSignalClient(sxclient);

        navigate("/admin/home");
      } else {
        setErrorMessage("⚠️ There is an error login");
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  };

  console.log("email login = = =>", email);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t("signin_to_your_account")}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t("or")}{" "}
            <NavLink
              to={`/adminsignup`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              {t("create_a_new_account")}
            </NavLink>
          </p>
        </div>

        {/* <input type="hidden" name="remember" defaultValue="true" /> */}
        <form className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              {t("email_address")}
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={t("email_address")}
              onChange={(event) => setEmail(event.target.value)}
              // value={email}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {t("password")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder={t("password")}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
        </form>

        <div className="flex items-center justify-between">
          {/* <div className="flex items-center">
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
            </div> */}
          <div className="text-sm">
            <p className="font-medium text-blue-600 hover:text-blue-500">
              {t("forgot_password")}
            </p>
          </div>

          <div className="text-sm">
            <p className="font-medium text-red-600">{errorMessage}</p>
          </div>
        </div>

        <div>
          <button
            onClick={(event) => login({ username: email, password: password })}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                aria-hidden="true"
              />
            </span>
            {t("signin")}
          </button>
        </div>
      </div>
    </div>
  );
}

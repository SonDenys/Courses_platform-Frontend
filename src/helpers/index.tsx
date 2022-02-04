import axios from "axios";
import qs from "qs";
import {
  CreateTokenCache,
  getAccessToken,
  getRefreshToken,
  resetTokenCache,
  setAuthStatus,
} from "../Auth";
import konsole from "../konsole";
import { BACKEND_URL, REFRESH_TOKEN_URI } from "../params";
import { S } from "../utils";

// import data from "../Local/translations";

// import { set_access_token } from "../Auth";

import { config_json, config_urlencode, make_query_string } from "./utils";

export function axios_config_init() {
  axios.interceptors.request.use((request: any) => {
    console.log(
      `request.data == ${S(request.data)} \nheaders == ${S(request.headers)}`
    );
    if (
      request.data &&
      request.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      request.data = make_query_string(request.data);
      // console.log(`request.data == ${S(request.data)}`)
      console.log(`request.data == ${request.data}`);
    }
    return request;
  });

  axios.interceptors.request.use(
    (config: any) => {
      const access_token = getAccessToken().then((access_token) => {
        if (access_token) {
          config.headers["Authorization"] = "Bearer " + access_token;
          // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
        }
      });

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  var retryCounter = 0;
  var maxRetry = 3;
  // Response interceptor for API calls
  axios.interceptors.response.use(
    (response) => {
      retryCounter = 0;
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        retryCounter < maxRetry &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        retryCounter += 1;
        const access_token = await refresh_new_token();
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        originalRequest.headers["Authorization"] = "Bearer " + access_token;
        return axios(originalRequest);
      }
      return Promise.reject(error);
    }
  );
}

export async function refresh_new_token() {
  try {
    const result: any = await axios.post(
      REFRESH_TOKEN_URI,
      {
        refresh_token: getRefreshToken(),
      },
      config_json
    );

    if (result && result.data) {
      const access_token = result.data.access_token;
      const refresh_token = result.data.refresh_token;
      await CreateTokenCache({ access_token, refresh_token });
      return access_token;
    }
  } catch (e) {
    console.log("");
  }
  return "";
}

export function post_form_urlencode(url, data) {
  return axios.post(url, data, config_urlencode);
}

export async function signin({ username, password }) {
  const url = "/auth/signin";

  // console.log(`get sign ${S(getSignalX())}`)

  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);
  console.log(`url ==== ${url}`);

  const data = { username, password };

  try {
    const result: any = await axios.post(url, data, config_urlencode);

    console.log("result result result result result result result result ");
    console.log("result result result result result result result result ");
    console.log(result.data);
    console.log("result result result result result result result result ");
    console.log("result result result result result result result result ");

    if (result && result.data) {
      const access_token = result.data.access_token;
      const refresh_token = result.data.refresh_token;

      konsole.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>!");
      await CreateTokenCache({ access_token, refresh_token });
      konsole.log("Token cache created succesfully!");
      setAuthStatus(true);
      //alert(`hi ${JSON.stringify(result)}`)
      axios_config_init();

      // const user_id = await getPayloadValue('_id')
      // await connectToWS(user_id, 'password')

      //   getSocket()
      return true;
    }
  } catch (e) {
    setAuthStatus(false);
    console.error(`could not login ${e}`);
  }
  return false;
}

export const create_user = async ({
  firstname = "",
  lastname = "",
  username,
  email,
  password,
  scopes,
  profile_url = "",
  currency = null,
}) => {
  try {
    const url = "/auth/create_user";

    if (!(username && email && password && scopes)) {
      return;
    }

    const data = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
      scopes: scopes,
      profile_url: "",
      currency: "€",
    };

    const result: any = await axios.post(
      `${BACKEND_URL}${url}`,
      data,
      config_json
    );

    if (result && result.data) {
      // toast.success({ message: 'user is created, you can log in now !' })

      return result.data;
    } else {
      // toast.error({ message: 'user is not created, you can not log in now !' })
      return false;
    }
  } catch (e) {
    console.log(e);
  }

  return;
};

export function signout(history) {
  resetTokenCache();
  history.replace("/");
  // history.go(0)
}

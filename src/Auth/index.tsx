import axios from "axios";
// import { stat } from "fs";
import {
  BACKEND_URL,
  PUBLIC_KEY_URL,
  ISSUER,
  ALGORITHM,
  LS_TOKEN_CACHE_KEY,
  AEOLIA_PUBLIC_KEY_URL,
  setSignalXClient,
  getSignalXClient,
  SIGNALX_API_URL,
} from "../params";

// import { FileClient, pbkdf } from "../signalx-js/file_client";
// import FileClient from "../signalx-js/file_client";

// import jwt from "jsonwebtoken";
import * as jose from "jose";
import { setAccessToken as axiosSetAccessToken } from "axios-jwt";

import konsole from "../konsole";
import i18n from "i18next";
import { getLocalData, S, setLocalData } from "../utils";
import _ from "lodash";
import { setActiveSignedUserId, setActiveUserName } from "../_GlobalStates";

export let ACCESS_TOKEN: string = "";
export let REFRESH_TOKEN: string = "";
export let PUBLIC_KEY: string = "";
export let PUBLIC_KEY_UINT8: string = "" as any;
export const AUTH_STATUS_KEY = "aeolia_auth_status";
export let TOKEN_DATA: TokenCacheProps = {};

let IS_AUTHENTICATED: boolean = false;

export function set_PUBLIC_KEY(key: string) {
  PUBLIC_KEY = key;  
  // PUBLIC_KEY_UINT8 = Uint8Array.from(key, (c) => c.charCodeAt(0));
  // PUBLIC_KEY = key;
  // PUBLIC_KEY_UINT8 = Uint8Array.from(key, (c) => c.charCodeAt(0));
}

export function set_TOKEN_DATA(data: TokenCacheProps) {
  TOKEN_DATA = data;
  return TOKEN_DATA;
}

export function get_TOKEN_DATA() {
  return TOKEN_DATA;
}

export function setAuthStatus(status: boolean) {
  IS_AUTHENTICATED = status;
}

export function getAuthStatus() {
  return IS_AUTHENTICATED === true;
}

// export interface PayloadProps {
//     _id?: string
//     username?: string
//     email?: string
//     display_name?: string
//     firstname?: string
//     lastname?: string,
//     scopes?: string
//     active?: boolean
//     company_id?: string
//     organization_id?: string
//     created_at?: string
//     updated_at?: string
// }

export interface PayloadProps {
  _id?: string;
  company_id?: string;
  stripe_id?: string;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  scopes?: string;
  active?: boolean;
  currency?: string;
  created_at?: string;
  created_by?: string;
  updated_at?: string;
  updated_by?: string;
}

export interface TokenCacheProps {
  access_token?: string;
  refresh_token?: string;
  payload?: PayloadProps;
  selectedCompany?: {};
  selectedCustomer?: {};
  selectedOrganization?: {};
  selectedChannel?: {};
  selectedStore?: {};
  selectedStatus?: {};
  selectedSectionGroup?: {};
  selectedDepartment?: {};
  selectedJICFS?: {};
  seletedUnit?: {};
  selectedDai?: {};
  selectedTana?: {};
  activeUser?: {};
  language?: string;
  viewMode?: "messenger" | "file";
}

export interface TokenCachePropsKeys {
  key:
    | "access_token"
    | "refresh_token"
    | "payload"
    | "organisation"
    | "channel"
    | "selectedCompany"
    | "selectedStore"
    | "seletedUnit"
    | "selectedDai"
    | "selectedTana"
    | "language";
}

export interface WSPlayloadProps {
  _id: string;
  app_id?: string;
  company_id?: string;
  scopes?: Array<"app" | "log" | "user">;
}

// {
//     "jti": "d03267",
//     "aud": "",
//     "iss": "api.signalx.link",
//     "sub": "",
//     "iat": 1627303881,
//     "exp": 1630903881,
//     "csrf": "75a8b4",
//     "type": "app_token",
//     "data": {
//       "_id": "60e4d6b3138f0975c08ed5dc",
//       "app_id": "ca475a59c6cd4fa0a56d68dfec5c59b3",
//       "company_id": null,
//       "scopes": [
//         "app"
//       ]
//     }
//   }

export interface WSTokenCacheProps {
  access_token?: string;
  refresh_token?: string;
  payload?: WSPlayloadProps;
}

// {
//     "jti": "38ac68",
//     "aud": "",
//     "iss": "dsvirtualsupermarketapi-dev.azurewebsites.net",
//     "sub": "",
//     "iat": 1600409925,
//     "exp": 1604013525,
//     "csrf": "e49872",
//     "type": "access",
//     "data": {
//       "_id": "5f48ffba129230f7742ab4f7",
//       "username": "jun@aeonx.ai",
//       "email": "jun@aeonx.ai",
//       "firstname": "",
//       "lastname": "",
//       "scopes": "admin",
//       "active": false,
//       "created_at": "2020-08-28T21:59:38+09:00",
//       "updated_at": "2020-08-28T21:59:38+09:00"
//     }
//   }

export interface validatedTokenProps {
  access_token?: string;
}
export async function validatedToken(props: validatedTokenProps) {
  const access_token: string = props.access_token || "";

  try {
    console.log(` verify payload : 
            ${access_token}
            ${PUBLIC_KEY}
            ${ISSUER}
            ${ALGORITHM}
        `);
    // const payload = jwt.verify(access_token, PUBLIC_KEY, {
    // const pkey = Uint8Array.from(PUBLIC_KEY, (c) => c.charCodeAt(0));
    const result = await jose.jwtVerify(access_token, PUBLIC_KEY as any, {
      issuer: ISSUER,
      algorithms: [ALGORITHM as any],
    });
    if(!result) {
      throw new Error("Invalid token");
    }
    const payload = result.payload;

    console.log(` verify payload : 
        ${S(payload)}`);

    //await saveTokenCache(payload)
    // await axiosSetAccessToken(access_token)
    setAuthStatus(true);

    // const status = getAuthStatus()
    // konsole.log(`setAuthStatus === ${status}`)

    console.log(` verify payload  4: 
        ${S(payload)}`);

    return payload;
  } catch (e) {
    konsole.log(`Access token not valid: ${e}`);
  }

  try {
    axiosSetAccessToken("");
  } catch (e) {
    konsole.log(`Could not set axiosSetAccessToken ${e}`);
  }
  setAuthStatus(false);
  return null;
}

export async function loadTokenCache(): Promise<TokenCacheProps> {
  let token_data: TokenCacheProps = await getTokenCache();

  konsole.log("token_data token_data token_data token_data token_data ");
  konsole.log("token_data token_data token_data token_data token_data ");
  konsole.log("token_data token_data token_data token_data token_data ");
  konsole.log(`verify payload 3 ${S(token_data)}`);
  konsole.log("token_data token_data token_data token_data token_data ");
  konsole.log("token_data token_data token_data token_data token_data ");
  konsole.log("token_data token_data token_data token_data token_data ");

  console.log(`verify now 2 : ${JSON.stringify(token_data)}`);

  let payload: PayloadProps = ((await validatedToken({
    access_token: token_data.access_token,
  })) || {}) as PayloadProps;

  console.log(` verify payload : 2
        ${S(payload)}`);

  if (_.size(payload)) {
    return {} as any;
  }

  token_data.payload = payload || {};

  console.log(`verify now : ${JSON.stringify(token_data)}`);
  await SaveTokenCache(token_data);
  const name = token_data.payload.firstname || token_data.payload.username;
  setActiveUserName(name);
  if (token_data.access_token)
    await initSignalXClient(
      token_data.access_token,
      token_data.refresh_token || "",
      null
    );

  return token_data;
}

export async function initSignalXClient(
  token: string,
  refresh_token: string,
  password?: string | null
) {
  console.log(`password ${password}`);
  console.log(`password ${password}`);
  console.log(`password ${password}`);
  console.log(`password ${password}`);
  try {
    const response = await axios.post(
      "https://aeolia-api.aeonx.ai/auth/get_signalx_token",
      undefined,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`response === ${S(response)}`);
    if (response && response.data) {
      const data = response.data;

      const access_token: any = data?.access_token || "";
      const refresh_token: any = data?.refresh_token || "";

      if (password) {
        const client = {} as any;

        // await FileClient.init({
        //   url: SIGNALX_API_URL as any,
        //   token: access_token,
        //   refresh_token: refresh_token,
        //   password: password as any,
        //   secret: undefined
        // });
        // localStorage.setItem("secret", await client.export());
        setSignalXClient(client);
      } else {
        const secret: any = localStorage.getItem("secret");
        console.log("secret", secret);
        const token: any = response?.data?.access_token || "";
        const refresh_token: any = response?.data?.refresh_token || "";

        const client = "";

        // await FileClient.init({
        //   url: SIGNALX_API_URL as any,
        //   token: token,
        //   refresh_token: refresh_token,
        //   password: undefined,
        //   secret: secret
        // }
        // );
        setSignalXClient(client);
      }
    }
  } catch (e) {
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
    konsole.error(`ERROR: ${e}`);
  }
}

export interface CreateTokenCacheProps {
  access_token: string;
  refresh_token: string;
}
export async function CreateTokenCache(props: CreateTokenCacheProps) {
  // const [selectedCompany, setSelectedCompany] = useRecoilState(selectedCompanyState)
  //const [signedUserId, setSignedUserId] = useRecoilState(signUserIdState);
  // const [signedUser_StripeId, setSignedUser_StripeId] = useRecoilState(
  //   signUser_StripeIdState
  // );

  const access_token: string = props.access_token;
  const refresh_token: string = props.refresh_token;

  let new_token_data: TokenCacheProps = {};
  var payload: any;
  try {
    payload = await validatedToken({ access_token });
    // const payload_data = JSON.parse(payload.data);
    // const signed_user_stripeId: any = payload_data.stripe_id;
    // setSignedUser_StripeId(signed_user_stripeId);
    // setPayloadValue("stripe_id", setSignedUser_StripeId);

    // console.log("signed_userId_Stripe = = = = =", signedUser_StripeId);

    console.log("init signalx client (CreateTokenCache)");
    // await initSignalXClient(access_token, null);
  } catch (e) {
    konsole.log(`Could not validate access_token ${e}`);
    konsole.log(e);
    return;
  }

  console.log(`payload validated : ${JSON.stringify(payload.data)}`);
  console.log(`id user : ${JSON.stringify(payload.data._id)}`);

  new_token_data.access_token = access_token;
  new_token_data.refresh_token = refresh_token;
  new_token_data.payload = payload;
  return await SaveTokenCache(new_token_data);
}

export async function SaveTokenCache(token_data: TokenCacheProps) {
  try {
    TOKEN_DATA = token_data;
    // const token_data_str = JSON.stringify(token_data)
    // konsole.log(`token_data_str ${token_data_str}`)
    // window.localStorage.setItem(LS_CACHE_KEY, token_data_str)
    await setLocalData(LS_TOKEN_CACHE_KEY, token_data);

    const name =
      token_data?.payload?.firstname || token_data?.payload?.username;
    setActiveUserName(name);

    // LOCAL_STORAGE[LS_CACHE_KEY] = token_data_str
    return token_data;
  } catch (e) {
    konsole.log(`could not save token_data to local storage: ${e}`);
  }
  TOKEN_DATA = {};
  return TOKEN_DATA;
}

export async function getTokenCache(): Promise<TokenCacheProps> {
  if (_.size(TOKEN_DATA)) {
    return TOKEN_DATA;
  }

  try {
    // TOKEN_DATA = JSON.parse(window.localStorage.getItem(LS_CACHE_KEY) || "{}")
    TOKEN_DATA = (await getLocalData(LS_TOKEN_CACHE_KEY)) || {};
    // await initSignalXClient(TOKEN_DATA.access_token, null);
    return TOKEN_DATA;
  } catch (e) {
    konsole.log(`Could not get token cache ${e}`);
  }
  return TOKEN_DATA;
  // return {
  //   access_token:
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJhNTA2NmUiLCJhdWQiOiIiLCJpc3MiOiJhcGkuc2lnbmFseC5saW5rIiwic3ViIjoiIiwiaWF0IjoxNjI0ODgxMzg2LCJleHAiOjE2Mjg0ODEzODYsImNzcmYiOiJkMWZkN2EiLCJ0eXBlIjoiYXBwX3Rva2VuIiwiZGF0YSI6eyJfaWQiOiI2MGQ5ZDQ3OTRiMzBlN2FhMDVlOWEzOWYiLCJhcHBfaWQiOiJkZTU3ZGNlYzAzOGY0YzY4OWZjYzRiNDc3MjhmMzI5NyIsImNvbXBhbnlfaWQiOm51bGwsInNjb3BlcyI6WyJhcHAiXX19.ZpJpZOz_q5AjcXBM8QB3mWEdZ7Zz5hwtEMwDhyQssVEDgkA7N3fpPMIlEfZ01sZwhggTZDSCftOzFdViTDsF_Jjxe_Qia2Xhdsf4I6aP-miYi_gkE2QFjHI-qFhd2XolLpZPgzRBS_A9rXPhDeuDdKIXPkKokYF0YTcwds-Z6xCCAHzg6I18-gSSLZAPr7d5ZZXXRkBw8LNYm3JDjIbNgoalYVg2I6_F-DNPcE4cT2IzbLaoKH6yZjnRL-d7LyAnOxhxlOIXRYozyHnXHlbn_pxnhWsXXtlYxbPBXroIcze83ifg3WDt6xXOQo3k-L6ZupONXcvBf0wO8jwpqetRsw",
  // };
}

let ACTIVE_LANGUAGE = "";

export function setActiveLanguageCache(lang: string) {
  const key = `${LS_TOKEN_CACHE_KEY}-lang`;
  ACTIVE_LANGUAGE = lang;
  window.localStorage.setItem(key, JSON.stringify(lang || ""));
  // window.localStorage.setItem(key, JSON.stringify(lang || ""))
  // setLocalData(key, lang).then((v) => {
  //   konsole.log();
  // });
}

export function getActiveLanguageCache() {
  if (ACTIVE_LANGUAGE) {
    return ACTIVE_LANGUAGE;
  }
  const key = `${LS_TOKEN_CACHE_KEY}-lang`;
  const lang = window.localStorage.getItem(key);
  ACTIVE_LANGUAGE = lang ? JSON.parse(lang) : "";
  return ACTIVE_LANGUAGE;
}

export function __loadActiveLanguageCache() {
  let lang = getActiveLanguageCache();
  if (!lang) {
    lang = i18n.language;
    setActiveLanguageCache(lang);
    return lang;
  }
  return lang;
}

export function updateTokenCache(token_data: TokenCacheProps) {
  for (let k in token_data) {
    const value = (token_data as any)[k];
    if (value !== undefined) {
      (TOKEN_DATA as any)[k] = value;
    }
  }

  return SaveTokenCache(TOKEN_DATA);
}

export function resetTokenCache() {
  setAuthStatus(false);
  return SaveTokenCache({});
}

export function getTokenItem(key: string) {
  const token_data = getTokenCache();
  return (token_data as any)[key];
}

export function setTokenItem(key: string, value: any) {
  (TOKEN_DATA as any)[key] = value;
  SaveTokenCache(TOKEN_DATA);
}

export function isAuthenticated() {
  return getAuthStatus();
}

export async function getAccessToken() {
  return (await getTokenCache()).access_token;
}

export async function getRefreshToken() {
  return (await getTokenCache()).refresh_token;
}

export async function getPayload() {
  return (await getTokenCache()).payload;
}

export async function getUserName() {
  const tcache = (await getTokenCache()) || {};
  const payload: any = tcache.payload || {};
  konsole.log("getTokenCache().payload");
  konsole.log(tcache.payload);
  if (payload.data) {
    return payload.data.username;
  }
  return "";
}

export function getScopes() {
  // return getPayloadValue("scopes") || ""
  return "admin";
}

export interface prepareActiveUserDataProps {
  username: string;
  email: string;
}

export function prepareActiveUserData(props: prepareActiveUserDataProps) {
  const { username, email } = props;
  return { username, email };
}

export async function setUserName(username: string) {
  const payload: any = { ...((await getTokenCache()).payload || {}) };

  if (payload.data) {
    payload.data["username"] = username;
  }
  return "";
}

export async function getPayloadValue(key: string) {
  return ((((await getTokenCache()).payload || {}) as any).data || {})[key];
}

export async function setPayloadValue(key: string, value: string) {
  const token_data: any = (await getTokenCache()) || {};

  // if(Object.keys(token_data).length===0){
  //     return
  // }

  konsole.log("setPayloadValue --- token_data");
  konsole.log(token_data);

  const payload: any = (token_data.payload || {}) as any;

  // if(Object.keys(payload).length===0){
  //     return
  // }

  const new_data: PayloadProps = payload.data || {};

  // if(Object.keys(new_data).length===0){
  //     return
  // }

  (new_data as any)[key] = value;
  payload["data"] = new_data;
  token_data["payload"] = payload;

  SaveTokenCache(token_data);
}

export async function getEmail() {
  const payload: any = (await getTokenCache()).payload || {};
  if (payload.data) {
    return payload.data.email;
  }
  return "";
}

export async function getSelectedCompanyFromCache() {
  return (await getTokenCache()).selectedCompany || {};
}

export async function loadPublicKey() {
  console.log(`PUBLIC_KEY_URL === ${AEOLIA_PUBLIC_KEY_URL}`);
  try {
    if (PUBLIC_KEY) {
      return PUBLIC_KEY;
    }
    const result = await axios.get(AEOLIA_PUBLIC_KEY_URL);
    if (result && result.data) {
      // PUBLIC_KEY = result.data;
      set_PUBLIC_KEY(result.data);
    } else {
      // PUBLIC_KEY = "";
      set_PUBLIC_KEY(result.data);
      // PUBLIC_KEY = "";
    }
    return PUBLIC_KEY;
  } catch (e) {
    konsole.log(e);
  }
  // PUBLIC_KEY = "";
  set_PUBLIC_KEY("");

  return "";
}

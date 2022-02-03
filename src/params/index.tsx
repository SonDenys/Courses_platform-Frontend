export const BACKEND_URL =
  process.env.REACT_APP_AEOLIA_BACKEND_URL || "https://aeolia-api.aeonx.ai";

console.log(`BACKEND_URL ====== ${BACKEND_URL}`);

export const ISSUER = process.env.REACT_APP_AEOLIA_ISSUER;
export const PUBLIC_KEY_URL = "/public/public-key.txt";
export const REFRESH_TOKEN_URI = "/auth/refresh_token";
export const ALGORITHM = process.env.REACT_APP_ALGORITHM || "RS256";

//  SignalX

export const SIGNALX_APP_ID = process.env.REACT_APP_SIGNALX_APP_ID;
export const SIGNALX_APP_SECRET = process.env.REACT_APP_SIGNALX_SECRET;

export const SIGNALX_API_URL = "https://api.signalx.link";
// export const SIGNALX_API_URL = "http://localhost:28114"
export const SIGNALX_WS_URL = process.env.REACT_APP_SIGNALX_WS_URL;

export const SIGNALX_PUBLIC_KEY_URL =
  SIGNALX_API_URL + "/public/public-key.txt";

export const AEOLIA_PUBLIC_KEY_URL = BACKEND_URL + "/public/public-key.txt";

export const SIGNALX_ISSUER = process.env.REACT_APP_SIGNALX_ISSUER;

export const AUTH_TOKEN_KEY = "__aeolia_auth__";
export const ACCESS_TOKEN_KEY = "__aeolia_access_token__";
export const REFRESH_TOKEN_KEY = "__aeolia_refresh_token__";
export const AUTH_STATUS_KEY = "__aeolia_auth_status__";
export const API_VERSION = "/api/v1.0";
// export const REFRESH_TOKEN_ENDPOINT = "/auth/refresh_token";

export const LS_TOKEN_CACHE_KEY = "__aeolia_token_cache_data1__";

export const LANGUAGE_SETTINGS_KEY = "__aefx__language_setting__";

console.log(`BACKEND_URL = ${BACKEND_URL}`);
console.log(`PUBLIC_KEY_URL = ${PUBLIC_KEY_URL}`);

export var SIGNALX_CLIENT: any;

export function setSignalXClient(client: any) {
  SIGNALX_CLIENT = client;
}

export function getSignalXClient() {
  return SIGNALX_CLIENT;
}

export const STRIPE_KEY =
  "sk_test_51G6NfnE7Rxdr8W1IsVFKJ4KZcq2uoeIT3PN5kxST4jdl90ima9hAkh7ru5HoikTDJpV7KtHehILbFMkixv0Fwu7C00pk2bHGS1";
export const SRIPE_PUBLISHABLE_KEY =
  "pk_test_pI7QNLDQfAs5nO2a3amc1jrk00wPKEJxbO";

export const AEOLIA_PRODUCT_KEY = "prod_JbOyVhaDCyYcMy";

export const GET_PLANS_CACHE_KEY = "__get_plans_cache_data__";

import { atom, selector } from "recoil";
import {
  getAccessToken,
  getActiveLanguageCache,
  getScopes,
  getSelectedCompanyFromCache,
  getTokenCache,
  getUserName,
  isAuthenticated,
  setActiveLanguageCache,
  setPayloadValue,
  updateTokenCache,
} from "../Auth";

import konsole from "../konsole";
import i18n from "../Locale";
import { v4 as uuid } from "uuid";

var ACTIVE_USER_NAME = "";
var ACTIVE_USER_ID = "";

export const authenticationState_base = atom<boolean>({
  key: "authenticationState_base",
  default: false,
});

export const authenticationState = selector<boolean>({
  key: "authenticationState",
  get: ({ get }) => {
    const auth = isAuthenticated();
    return auth;
  },
  set: ({ set }, newValue: any) => {
    // newValue must be from isAuthenticated()
    // this is meant to force rerender when authentication status changes
    set(authenticationState_base, newValue);
  },
});

export const setActiveUserName = (name) => {
  ACTIVE_USER_NAME = name;
};

export const getActiveUserName = () => {
  return ACTIVE_USER_NAME;
};

export const setActiveSignedUserId = (user_signed_id) => {
  ACTIVE_USER_ID = user_signed_id;
};

export const getActiveSignedUserId = () => {
  return ACTIVE_USER_ID;
};

export const authenticationDataLoadedState = atom<boolean>({
  key: "authenticationDataLoadedState",
  default: false,
});

export const base_activeUserState = atom<string>({
  key: "base_activeUserState",
  default: "",
});

export const activeUserState = selector<string>({
  key: "activeUserState",
  get({ get }) {
    const username = get(base_activeUserState);

    konsole.log("activeUserState username");
    konsole.log(`username == ${username}`);

    const token = getTokenCache();
    konsole.log("getTokenCache()");
    konsole.log(token);

    if (username) {
      return username;
    }
    return getUserName() || "";
  },
  set({ set }, newValue: any) {
    set(base_activeUserState, newValue);
    setPayloadValue("username", newValue);
    updateTokenCache({ activeUser: newValue });
  },
});

let GLOBAL_SCOPES = getScopes();
export function reset_global_scopes() {
  GLOBAL_SCOPES = getScopes();
}

export function get_global_scopes() {
  GLOBAL_SCOPES = getScopes();
  return GLOBAL_SCOPES;
}

export const base_scopesState = atom<string>({
  key: "base_scopesState",
  default: "",
});

export const scopesState = selector<string>({
  key: "scopesState",
  get({ get }) {
    let scopes: string = getScopes();

    konsole.log(`scopes ======= ${scopes}`);

    if (scopes.length) {
      return scopes;
    }
    return get(base_scopesState);
  },
  set({ set }, newValue: any) {
    let v: any = newValue;
    if (typeof v !== "string") {
      konsole.error(`scopes must be a string. given ${JSON.stringify(v)}`);
      return;
    }
    // setPayloadValue("scopes", v)
    // const is_unit = (v || "").split(" ").filter(x => x.length > 0).indexOf("unit") !== -1
    // set(unitAppModeState, is_unit)
    set(base_scopesState, v);
  },
});

export const showSpinnerState = atom<boolean>({
  key: "showSpinnerState",
  default: false,
});

// atoms for the unit
export const currentSectionListState = atom<any>({
  key: "currentSectionListState",
  default: [],
});


export const base_activeLanguageState = atom<string>({
  key: "base_activeLanguage",
  default: "en",
})

export const activeLanguageState = selector<string>({
  key: "activeLanguage",
  get({ get }) {
    const lang = getActiveLanguageCache();
    if (lang) {
      return lang;
    }
    return get(base_activeLanguageState);
  },
  set({ set }, newValue: any) {
    set(base_activeLanguageState, newValue);
    setActiveLanguageCache(newValue);
    i18n.changeLanguage(newValue);
  }
})



// // atom for changing the users and disscusions
// export const channelState = atom<any>({
//     key: "channelState",
//     default: {}
// })

// export const directMessageState = atom<any>({
//     key: "directMessageState",
//     default: {}
// })

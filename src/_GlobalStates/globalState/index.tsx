import { atom } from "recoil";

export const emailStateReceiver = atom<string>({
  key: "emailStateReceiver",
  default: "",
});

export const emailStateSender = atom<string>({
  key: "emailStateSender",
  default: "",
});

export const lastNameState = atom<string>({
  key: "lastNameState",
  default: "",
});

export const titleState = atom<string>({
  key: "titleState",
  default: "",
});

export const messageState = atom<string>({
  key: "messageState",
  default: "",
});

export const nameFileState = atom<string>({
  key: "nameFileState",
  default: "",
});

export const userTokenState = atom({
  key: "userToken",
  default: "",
});

export const userIdFile = atom({
  key: "userIdFile",
  default: "",
});

export const fileIDState = atom({
  key: "fileID",
  default: "",
});

export const signUserIdState = atom<any>({
  key: "signUserId",
  default: "",
});

export const signUser_StripeIdState = atom<any>({
  key: "signUser_StripeId",
  default: "",
});

export const orgaDataState = atom<any>({
  key: "orgaDataState",
  default: {},
});

export const organizationsListState = atom<any>({
  key: "organizationsListState",
  default: [],
});

export const idOrgaState = atom<string>({
  key: "idOrgaState",
  default: "",
});

export const userListOrgaState = atom<any>({
  key: "userListOrgaState",
  default: [],
});

export const userNameOrgaState = atom({
  key: "userNameOrgaState",
  default: [],
});

export const userOrgaDataState = atom<any>({
  key: "userOrgaDataState",
  default: [],
});

export const userIdOrgaListState = atom<any>({
  key: "userIdOrgaListState",
  default: [],
});

export const personNameState = atom({
  key: "personNameState",
  default: [],
});

export const personNameIdStringState = atom<String>({
  key: "personNameIdStringState",
  default: "",
});

export const userNameSelectedState = atom({
  key: "userNameSelectedState",
  default: [],
});

export const fileListSelectedState = atom<any>({
  key: "fileListSelectedState",
  default: [],
});

export const showBackgroundState = atom({
  key: "showBackgroundState",
  default: "",
});

export const invited_adminIdState = atom<String>({
  key: "invited_adminIdState",
  default: "",
});

export const invited_organizationIdState = atom<String>({
  key: "invited_organizationIdState",
  default: "",
});

export const invited_emailState = atom<String>({
  key: "invited_emailState",
  default: "",
});

export const invited_codeState = atom<String>({
  key: "invited_codeState",
  default: "",
});

export const plansData_State = atom<any>({
  key: "plansData_State",
  default: "",
});

export const amountStripeState = atom<Number>({
  key: "amountStripeState",
  default: 0,
});

export const priceTodisplayState = atom<Number>({
  key: "priceTodisplayState",
  default: 0,
});

export const error_stripePaymentState = atom<any>({
  key: "error_stripePaymentState",
  default: "",
});

export const course_idState = atom<any>({
  key: "course_idState",
  default: "",
});

export const chapter_idState = atom<any>({
  key: "chapter_idState",
  default: "",
});

export const selectedOrganization_State = atom<any>({
  key: "selectedOrganization_State",
  default: {},
});

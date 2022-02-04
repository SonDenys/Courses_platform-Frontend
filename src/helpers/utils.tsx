import React from "react";
import axios from "axios";
import i18n from "i18next";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import urljoin from "url-join";
import { API_VERSION, BACKEND_URL } from "../params";
import konsole from "../konsole";

export const config_urlencode = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

export const config_json = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};
export function prepare_query(q = {}, as_query_string = false) {
  const new_q = {};
  const q_str: any = [];

  if (as_query_string) {
    for (let k in q) {
      if (q[k] === undefined || q[k] === null) {
        continue;
      }
      q_str.push(encodeURIComponent(k) + "=" + encodeURIComponent(q[k]));
    }
    if (q_str.length === 0) {
      return "";
    }

    const resp = q_str.join("&");
    if (resp) {
      return "?" + resp;
    }

    return "";
  }

  for (let k in q) {
    if (q[k] === undefined || q[k] === null) {
      continue;
    }
    new_q[k] = q[k];
  }

  return new_q;
}

export function make_query_string(q = {}) {
  const q_str: any = [];

  for (let k in q) {
    if (q[k] === undefined || q[k] === null) {
      continue;
    }
    q_str.push(encodeURIComponent(k) + "=" + encodeURIComponent(q[k]));
  }
  if (q_str.length === 0) {
    return "";
  }

  const resp = q_str.join("&");
  return resp;
}

// export function prepare_query(q = {}, make_uri = false) {
//   const new_q = {}
//   const q_str: any = []

//   // console.log("qqqqqqq=====")
//   // console.log(q)

//   if (make_uri) {
//     for (let k in q) {
//       if (q[k] === undefined || q[k] === null) {
//         continue
//       }
//       q_str.push(encodeURIComponent(k) + "=" + encodeURIComponent(q[k]))
//     }

//     const resp = q_str.join("&")
//     if (resp) {
//       return "?" + resp
//     }
//     return ""
//   }

//   for (let k in q) {
//     if (q[k] === undefined || q[k] === null) {
//       continue
//     }
//     new_q[k] = q[k]
//   }

//   return new_q
// }

export function prepare_url(method_name: string, q_str?: string) {
  if (q_str) {
    return urljoin(BACKEND_URL, API_VERSION, method_name, q_str);
  }
  return urljoin(BACKEND_URL, API_VERSION, method_name);
}

export function add_new_key(data, kv?: any, base_key?: string) {
  for (let k in data) {
    if (data[k]) {
      data[k] = add_new_key_to_a_dict(data[k], k, kv, base_key);
      // // data[k]["key"] = data[k]._id || k
      // data[k]["key"] = k

      // if (kv) {
      //   for (let q in kv) {
      //     if (base_key) {
      //       data[k][base_key][q] = kv[q]
      //     } else {
      //       data[k][q] = kv[q]
      //     }
      //   }
      // }

      // console.log("add_new_key")
      // console.log(data)
    }
  }

  return data;
}

export function add_new_key_to_a_dict(data, k, kv?: any, base_key?: string) {
  console.log("dict");
  if (data) {
    // data[k]["key"] = data[k]._id || k
    data["key"] = k;

    if (base_key) {
      data[base_key]["key"] = k;
    }
    if (kv) {
      for (let q in kv) {
        if (base_key) {
          data[base_key][q] = kv[q];
        } else {
          data[q] = kv[q];
        }
      }
    }

    // console.log("add_new_key")
    // console.log(data)
  }

  return data;
}

export function getUniqueID(data: any) {
  let max_id = 0;
  for (let k in data) {
    if (data[k].id >= max_id) {
      max_id = data[k].id + 1;
    }
  }
  return max_id;
}

export interface PageStatusData {
  access_token?: any;
  refresh_token?: any;
  main_sidebar?: any;
  company_page_sidebar_collapsed?: any;
  store_page_sidebar_collapsed?: any;
  item_page_sidebar_collapsed?: any;
  tana_page_sidebar_collapsed?: any;
  dai_page_sidebar_collapsed?: any;
  unit_page_sidebar_collapsed?: any;
}

// const DS_PAGE_STATUS_KEY = "ds_page_status"

// export function set_page_status(status: PageStatusData = {}) {
//   // let data = JSON.parse(window.localStorage.getItem(DS_PAGE_STATUS_KEY) as any) || {}
//   let data;

//   getLocalData(DS_PAGE_STATUS_KEY).then(x => { data = x })

//   for (let k in status) {
//     data[k] = status[k]
//   }

//   // window.localStorage.setItem(DS_PAGE_STATUS_KEY, JSON.stringify(data))
//   setLocalData(DS_PAGE_STATUS_KEY, data)
//   return data
// }

// export function get_page_status(): PageStatusData {
//   // return (JSON.parse(window.localStorage.getItem(DS_PAGE_STATUS_KEY) as any) || {}) as PageStatusData
//   return (JSON.parse(window.localStorage.getItem(DS_PAGE_STATUS_KEY) as any) || {}) as PageStatusData
// }

// export function filter_all_fields(data: Array<object> = [], value, base_field?) {
//   return data.filter(o =>
//     Object.keys((base_field? o[base_field]: o)).some(k =>
//       String((base_field? o[base_field]: o)[k])
//         .toLowerCase()
//         .includes(String(value).toLowerCase())
//     ))
// }

export function remove_puntuation(text) {
  return String(text)
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\t]/g, " ")
    .split(" ")
    .filter((x) => x.length)
    .join(" ");
}

export function and_match(text: string, keyword_list: Array<string>) {
  const t = String(text);
  const m: Array<string> = keyword_list.filter((x) => t.match(String(x)));
  if (keyword_list.length === m.length) {
    return true;
  }
  return false;
}

// export function filter_all_fields(data: Array<object> = [], value, base_field?) {
//   const query = remove_puntuation(value).split(" ").join("|");

//   return data.filter((o) => {
//     const obj = base_field ? o[base_field] : o;
//     return Object.keys(obj).some((k) =>
//       remove_puntuation(obj[k]).toLowerCase().match(query)

//     )
//   });
// }

export function filter_all_fields(
  data: Array<object> = [],
  value,
  base_field?
) {
  const v = (value || "").toLowerCase().replace(/\\/g, "");
  const query = remove_puntuation(v).split(" ");

  konsole.log("query");
  konsole.log(query);

  return data.filter((o) => {
    const obj = base_field ? o[base_field] : o;
    console.log("base field " + JSON.stringify(o));
    console.log("base field value " + o[base_field]);

    console.log("obj : " + JSON.stringify(obj));
    return Object.keys(query).every((idx) =>
      Object.keys(obj).some((k) =>
        remove_puntuation(obj[k]).toLowerCase().includes(query[idx])
      )
    );
  });
}

// export function filter_all_fields(data: Array<object> = [], value, base_field?) {
//   const query_list = remove_puntuation(value).split(" ")

//   return data.filter((o) => {
//     const obj = base_field ? o[base_field] : o;
//     const new_longstr: Array<string> = []
//     // return Object.keys(obj).some((k) =>
//     //   and_match(remove_puntuation((obj)[k]).toLowerCase(), query_list)

//     // )

//     const text = remove_puntuation((Object.keys(obj).map(k => new_longstr.push(String(obj[k])) )).join(" "))
//     konsole.log("text")
//     konsole.log(text)
//     return and_match(remove_puntuation(text).toLowerCase(), query_list)

//   });
// }

export function get_object_in_list(data, key, value) {
  for (let idx in data) {
    if (data[idx]) {
      if (data[idx][key] === value) {
        return data[idx];
      }
    }
  }
  return {};
}

export const customizeRenderEmpty = () => (
  <span>{i18n.t("no_data_found")}</span>
);

export function detectDataChange(
  new_data: {},
  old_data: {},
  ignore_key_list: any = []
) {
  const new_update_field: any = {};

  for (let k in new_data) {
    if (ignore_key_list.indexOf(k) >= 0) {
      continue;
    }

    // if (k === "show_mode") {
    //   continue
    // }

    if (String(old_data[k]) !== String(new_data[k])) {
      if (old_data[k] === undefined && String(new_data[k]) === "") {
        delete new_update_field[k];
      } else {
        new_update_field[k] = new_data[k];
      }
    }
  }

  konsole.log("new_update_field");
  konsole.log(new_update_field);

  konsole.log("old_data");
  konsole.log(old_data);

  konsole.log("new_data");
  konsole.log(new_data);

  return new_update_field;
}

export function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

// function getUniqueID(data) {
//   let max_id = 0

//   for (let k in data) {
//       if (data[k].id >= max_id) {
//           max_id = data[k].id + 1
//       }
//   }
//   return max_id
// }

export function add_id_to_list_elements(data: any) {
  const new_dai_data: Array<any> = [];
  let dt: any;

  for (let k in data || []) {
    dt = { ...data[k] };
    // if (dt["id"] === undefined) {
    dt["id"] = k;
    // }
    new_dai_data.push(dt);
  }
  return new_dai_data;
}

export function remove_element_from_list(data: any, id) {
  const new_dai_data: Array<any> = [];

  for (let k in data || []) {
    if (data[k].id === id) {
      continue;
    }
    new_dai_data.push(data[k]);
  }
  // return add_id_to_tana(new_dai_data)
  return new_dai_data;
}

// export function find_index(data, key, value){
//   for(let k in data){
//     if(data[k][key] === value){
//       return k
//     }
//   }
//   return
// }

export const detectListElementChanges = (
  new_data_list: Array<any>,
  old_data_list: Array<any>
) => {
  if (old_data_list.length !== new_data_list.length) {
    return true;
  }

  for (let k in old_data_list) {
    const new_val = new_data_list[k].index;
    const old_val = (old_data_list[k] as any).index;

    if (new_val !== old_val) {
      return true;
    }
  }

  return false;
};

export function get_element_from_list(data, field_name, value) {
  if (!data || (data && data.length == 0)) {
    return;
  }

  for (let k in data) {
    if (data[k][field_name] === value) {
      return data[k];
    }
  }
}

export function isNull(val) {
  return !val || val === "null" || val === "\u0000";
}

// export function TransfertData(stripeAmount, amount) {
//   const navigate = useNavigate();
//   const [amountStripe, setAmountStripe] = useRecoilState(amountStripeState);
//   const [priceToDisplay, setPriceToDisplay] =
//     useRecoilState(priceTodisplayState);

//   setAmountStripe(stripeAmount);
//   setPriceToDisplay(amount);
//   navigate("/app/payment");
// }

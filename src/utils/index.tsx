import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import konsole from "../konsole";

export function prepare_query(q = {}, make_uri = false) {
  const new_q = {};
  const q_str: string[] = [];
  // if make_uri === true, create query string, otherwise make data object
  // konsole.log("qqqqqqq=====")
  // konsole.log(q)
  if (make_uri) {
    for (let k in q) {
      if (q[k] === undefined || q[k] === null) {
        continue;
      }
      q_str.push(encodeURIComponent(k) + "=" + encodeURIComponent(q[k]));
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

export const config_urlencode = {
  headers: {
    // post: {
    //   "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    // },
    "Content-Type": "application/x-www-form-urlencoded",
  },
  credentials: false,
};




export function getRect(el) {
  if (!el) {
      return {}
  }

  // konsole.log("getRectgetRectgetRectgetRectgetRectgetRect")
  // konsole.log(el)
  // konsole.log("getRectgetRectgetRectgetRectgetRectgetRect")
  const rect = el.getBoundingClientRect()

  return {
      id: el.id,
      left: rect.left,
      top: rect.top,
      // left: Math.round(rect.left + window.scrollX),
      // top: Math.round(rect.top + window.screenY),
      width: rect.width,
      height: rect.height
  }
}


export function S(data) {
  try {
      return JSON.stringify(data, null, 2)
  } catch (e) {
      return data
  }
}


// export function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }




export class defaultdict {
  constructor(defaultInit) {
      return new Proxy({}, {
          get: (target, name) => name in target ?
              target[name] :
              (target[name] = typeof defaultInit === 'function' ?
                  new defaultInit().valueOf() :
                  defaultInit)
      })
  }
}



export async function setLocalData(key, value){
  var v
  if(typeof(value) !== "string"){
      v = JSON.stringify(value)
  }
  
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log(key)
  // konsole.log(v)
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  // konsole.log("setLocalData")    
  
  window.localStorage.setItem(key, v)
  
  // await set(key, value)
  return value 
}

export async function getLocalData(key){
  var value = window.localStorage.getItem(key) || ""
  // konsole.log("getLocalData")    
  // konsole.log("getLocalData")    
  // konsole.log("getLocalData")    
  // konsole.log(key)
  // konsole.log(value)
  // konsole.log("getLocalData")    
  // konsole.log("getLocalData")    
  // konsole.log("getLocalData")    
  return await JSON.parse(value)
  // return await get(key)
}


export function signout(history){
  
}

export function signin(history){

}

export function signup(history){

}



export const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};


export function  search_params_to_object(search_params){
  const params = new URLSearchParams(search_params);

  try{
    if(params){
      const q = JSON.parse('{"' + decodeURI(params.toString().substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
      const new_object = {};

      for (let k in q) {
        const v = q[k];
        const num = Number(v);
        if(!isNaN(num)){
          new_object[k] = num;
        }else{
          new_object[k] = v;
        }
      }
      return new_object;
    }

  }catch(e){
    konsole.error(`search_params_to_object error ${e}`)
  }

  return;
}
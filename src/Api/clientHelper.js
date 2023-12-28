import jwt_decode from 'jwt-decode';
import Axios from "axios";
// import { parseJwt } from "@utils/parseToken";
import { apiInstance } from "./apiInstance";
import { BaseURL, versionControl } from "./Api";


export const parseJwt = (token) => {
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};

export function setToken(token) {
  Object.assign(apiInstance.defaults.headers, {
    Authorization: `Bearer ${token}`,
  });
}

export async function handleRequest(request) {
  let login_token = await localStorage.getItem("access_token");
  let all_token = await JSON.parse(localStorage.getItem("token"));
  console.log("login_token", all_token?.refreshToken);
  if (login_token) {
    let decodedJwt = parseJwt(login_token);
    const body = {
      token: login_token,
      refreshToken: all_token?.refreshToken
    }
    console.log("body", body);
    if (Math.floor(new Date().getTime() / 1000) >= decodedJwt?.exp - 5 * 1) {
      await fetch(
        BaseURL + "api/" + versionControl + "/client/refreshtoken",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "bearer " + localStorage.getItem("access_token"),
          },
          body: JSON.stringify({
            token: login_token,
            refreshToken: all_token?.refreshToken
          }),
        }
      )
        .then((r) => r.json())
        .then(async (response) => {
          console.log("response", response);
          if (response?.code === 0) {
          } else if (response?.result?.token) {
            await setToken(response?.data?.jwt);
            await localStorage.setItem("access_token", response?.result?.token);
            await localStorage.setItem("token", JSON.stringify(response?.result));
            request.headers.Authorization = `Bearer ${response?.data?.jwt}`;
          }
        })
        .catch((e) => {
          console.log(
            "renew_token_error 47---->",
            JSON.stringify(e.response.data?.responseException)
          );
        });
      return request;
    }
  }
  return request;
}
export function handleResponse(value) {
  return value;
}
export async function handleApiError(error) {
  if (Axios.isCancel(error)) {
    console.log("Canceled");
    throw error;
  }
  if (!error.response) {
    throw error;
  }
  if (error.response.status === 401 || error.response.status === 402) {
    console.log("Please authorize to proceed", error.response);
    return error;
  } else if (error.response.status === 500) {
    console.log("Server error has occurred. Please try again later");
    throw error;
  } else {
    // showToast(error.toString());
  }
  throw error;
}
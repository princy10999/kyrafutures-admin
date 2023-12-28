import axios from "axios";
import { setToken } from "./clientHelper";
// import swal from "sweetalert";

export let BaseURL = "https://api-dev.kyrafutures.com/";
export let versionControl = "v1";
// const token = () => {
//   let token = "bearer " + JSON.parse(localStorage.getItem("access_token"));
//   return token;
// };
// let headers = {
//   authorization: "bearer " + JSON.parse(localStorage.getItem("access_token")),
// };

export const Bucket = process.env.REACT_APP_BUCKET;
export const getFileImage = (file) => {
  let ext = file?.split(".").pop();
  let filePrev = "";
  let img = [
    "apng",
    "avif",
    "gif",
    "jpg",
    "jpeg",
    "jfif",
    "pjpeg",
    "pjp",
    "png",
    "svg",
    "webp",
    "bmp",
    "ico",
    "cur",
    "tif",
    "tiff",
  ];
  if (img?.includes(ext?.toLowerCase())) {
    filePrev = BaseURL + file;
  }
  return filePrev;
};
export const ApiGetNoAuth = async (type) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + "api/" + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiPostNoAuth = async (type, userData) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + "api/" + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiPutNoAuth = async (type, userData) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type, userData)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiDeleteNoAuth = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type)
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          reject(error?.response?.data);
        } else {
          reject(error?.response);
        }
      });
  });
};

export const ApiGet = async (type) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + "api/" + type, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
          } else {
            reject(error?.response?.data);
          }
        } else {
          reject(error);
          console.log("error", error);
          if (error?.response?.data?.message === "Token has expired") {
            localStorage.clear();
            // swal({
            //   title: "Warning",
            //   text: "Token has expired",
            //   icon: "warning",
            // });
            // window.location.reload()
            window.location = "/chokmoki_web/login";
          }
        }
      });
  });
};

export const ApiPost = async (type, userData) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + "api/" + type, userData, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
          } else {
            reject(error?.response?.data);
          }
        } else {
          reject(error);
          if (error?.response?.data?.message === "Token has expired") {
            localStorage.clear();
            // swal({
            //   title: "Warning",
            //   text: "Token has expired",
            //   icon: "warning",
            // });
            // window.location.reload()
            window.location = "/chokmoki_web/login";
          } else if (error?.response?.data?.message === "Too Many Attempts.") {
            alert("Please wait 2 minute, after 2 minute reload website.");
          }
        }
      });
  });
};
// export const ApiPostuser = (type, userData, header) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(BaseURL + "api/" + type, userData, { headers: "bearer" + header })
//       .then((responseJson) => {
//         resolve(responseJson);
//       })
//       .catch((error) => {
//         if (
//           error?.hasOwnProperty("response") &&
//           error?.response?.hasOwnProperty("data") &&
//           error?.response?.data?.hasOwnProperty("error") &&
//           error?.response?.data?.error
//         ) {
//           if (error?.response?.status === 403) {
//           } else {
//             reject(error?.response?.data);
//           }
//         } else {
//           reject(error);
//           if (error?.response?.data?.message === "Token has expired") {
//             localStorage.clear();
//             window.location.reload();
//           } else if (error?.message === "Request failed with status code 401") {
//             // localStorage.clear()
//             window.location.reload();
//           }
//         }
//       });
//   });
// };

export const ApiPut = async (type, userData) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .put(BaseURL + "api/" + type, userData, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
          } else {
            reject(error?.response?.data);
          }
        } else {
          reject(error);
        }
      });
  });
};

export const ApiDelete = async (type) => {
  let login_token = await localStorage.getItem("access_token");
  if (login_token) {
    await setToken(login_token);
  }

  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + "api/" + type, {
        headers: {
          authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        if (
          error?.hasOwnProperty("response") &&
          error?.response?.hasOwnProperty("data") &&
          error?.response?.data?.hasOwnProperty("error") &&
          error?.response?.data?.error
        ) {
          if (error?.response?.status === 403) {
            //   signout();
          } else {
            reject(error?.response?.data);
          }
        } else {
          reject(error);
        }
      });
  });
};

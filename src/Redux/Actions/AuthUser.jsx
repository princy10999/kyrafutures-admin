import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ApiDelete,
  ApiGet,
  ApiGetNoAuth,
  ApiPost,
  ApiPostNoAuth,
  ApiPut,
} from "../../Api/Api";
import { api } from "../../Api/AuthApi";

export const getUserData = createAsyncThunk("getUserData", (bodyData) => {
  console.log(bodyData, "body2");
  const { body, body2 } = bodyData;
  return ApiPost(api.getUserData + body, body2)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const login = createAsyncThunk("login", async (body) => {
  return ApiPostNoAuth(api.login, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const register = createAsyncThunk("register", async (body) => {
  return ApiPostNoAuth(api.register, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const fileUpload = createAsyncThunk("fileupload", async (body) => {
  return ApiPostNoAuth(api.fileupload, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const updateUser = createAsyncThunk("updateUser", async (body) => {
  return ApiPut(api.updateUser, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const activeUser = createAsyncThunk("ActiveUser", async (body) => {
  return ApiPost(api.activeUser, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const deActiveUser = createAsyncThunk("deActiveUser", async (body) => {
  return ApiPost(api.deActiveUser, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const deleteUserAuth = createAsyncThunk("deleteUser", async (body) => {
  return ApiDelete(api.deleteUser + body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const verifiedUser = createAsyncThunk("verifiedUser", async (body) => {
  return ApiPost(api.verifiedUser, body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});

export const viewDataUser = createAsyncThunk("viewData", async (body) => {
  return ApiGet(api.viewData + body)
    .then((res) => {
      return res?.data;
    })
    .catch((err) => err);
});


// export const pagination = createAsyncThunk("pagination", async (body) => {
//   return ApiPostNoAuth(api.pagination , body)
//     .then((res) => {
//       return res?.data;
//     })
//     .catch((err) => err);
// });

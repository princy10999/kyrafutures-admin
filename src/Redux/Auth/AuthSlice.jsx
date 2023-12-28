import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { getUserData } from "../Actions/AuthUser";

const initialState = {
    dummyLists: [],
    userDetail: {},
    emailStatus:null,
  };

export let getUserDataSlice = createSlice({
    name: "getUserData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getUserData.pending, (state) => {
        state.status = "loading";
      });
      builder.addCase(getUserData.fulfilled, (state, { payload }) => {
        state.dummyLists = payload;
        state.status = "success";
      });
      builder.addCase(getUserData.rejected, (state, { payload }) => {
        state.dummyLists = payload;
        state.status = "failed";
      });
    },
  });

  
// export let userDetailsSlice = createSlice({
//     name: "userDetails",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder.addCase(userDetails.pending, (state) => {
//         state.status = "loading";
//       });
//       builder.addCase(userDetails.fulfilled, (state, { payload }) => {
//         state.userDetail = payload;
//         state.status = "success";
//       });
//       builder.addCase(userDetails.rejected, (state, { payload }) => {
//         state.userDetail = payload;
//         state.status = "failed";
//       });
//     },
//   });
// export let emailChangeStatusSlice = createSlice({
//     name: "emailChangeStatus",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder.addCase(emailChangeStatus.pending, (state) => {
//         state.status = "loading";
//       });
//       builder.addCase(emailChangeStatus.fulfilled, (state, { payload }) => {
//         state.emailStatus = payload;
//         state.status = "success";
//       });
//       builder.addCase(emailChangeStatus.rejected, (state, { payload }) => {
//         state.emailStatus = payload;
//         state.status = "failed";
//       });
//     },
//   });

  
export default combineReducers({
    isgetUserDataListData: getUserDataSlice.reducer,
    // isUserDetailsData: userDetailsSlice.reducer,
    // isEmailChangeStatusData: emailChangeStatusSlice.reducer,
  });
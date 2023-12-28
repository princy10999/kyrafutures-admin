import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import SVG from "react-inlinesvg";
import axios from "axios";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import Avatar from "../../../src/images/7309682.png";
import { MDBDataTable } from "mdbreact";
import Tabledata from "./Table";

import { AiFillEye } from "react-icons/ai";

import {
  ApiDelete,
  ApiGet,
  ApiPost,
  ApiPut,
  Bucket,
} from "../../helpers/API/ApiData";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import { Form, Input, Select, Upload } from "antd";
import { ErrorToast, SuccessToast } from "../../helpers/Toast";
import Search from "antd/lib/transfer/search";
import { userData } from "../../data";
// import { IoCloseSharp } from 'react-icons/io';
import { GrFormClose } from "react-icons/gr";

import { Grid, Switch } from "@material-ui/core";
import {
  getUserData,
  register,
  fileUpload,
  updateUser,
  ActiveUser,
  activeUser,
  deActiveUser,
  deleteUserAuth,
  verifiedUser,
  viewDataUser,
} from "../../Redux/Actions/AuthUser";
import { useDispatch } from "react-redux";
import PaginatedItems from "./pagination";
import Swal from "sweetalert2";
import "react-phone-number-input/style.css";
import IntlTelInput from "react-bootstrap-intl-tel-input";
const items = [...Array(33).keys()];

const Users = ({ itemsPerPage }) => {
  const [category, setCategory] = useState([]);
  const [add, setAdd] = useState(false);
  const [addData, setAddData] = useState({ isPremium: false });
  const [updateData, setupdateData] = useState({});
  const [videoId, setvideoId] = useState("");
  const [data, setdata] = useState([]);
  const [image, setimage] = useState("");
  const [search, setSearch] = useState("");
  const [viewUser, setViewUser] = useState(false);
  // const [type, setType] = useState("Add");
  const [type, setType] = useState("Add");
  const [viewData, setViewData] = useState();
  const [userFromApi, setUserFromApi] = useState();
  const [fileFromClick, setFileFromClick] = useState();
  const [updateUid, setUpdateUid] = useState();
  const [profilePicPath, SetProfilePicPath] = useState();
  const [adharPicPath, SetAdharPicPath] = useState();
  const [panPicPath, setPanPicPath] = useState();
  const [passPicPath, SetPassPicPath] = useState();
  // We start with an empty list of items.
  const [pageCount, setPageCount] = useState(1);
  const [value, setValue] = useState();
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const dispatch = useDispatch();

  // const history = useHistory();

  const getData = async (s) => {};

  useEffect(() => {
    getData(search);
  }, []);

  const fileUploadFunction = async () => {
    if (fileFromClick) {
      var formData = new FormData();
      formData.append("file", fileFromClick[0].originFileObj);
      formData.append("FolderId", 1);
      formData.append("IgnoreTimestamp", true);

      const fileupload = await dispatch(fileUpload(formData));
      SetProfilePicPath(fileupload?.payload?.result);
    } else {
    }
  };

  const AdharUploadFunction = async () => {
    if (fileFromClick) {
      var formData = new FormData();
      formData.append("file", fileFromClick[0].originFileObj);
      formData.append("FolderId", 2);
      formData.append("IgnoreTimestamp", true);

      const fileupload = await dispatch(fileUpload(formData));
      SetAdharPicPath(fileupload?.payload?.result);
    } else {
    }
  };
  const PanUploadFunction = async () => {
    if (fileFromClick) {
      var formData = new FormData();
      formData.append("file", fileFromClick[0].originFileObj);
      formData.append("FolderId", 2);
      formData.append("IgnoreTimestamp", true);
      const fileupload = await dispatch(fileUpload(formData));
      setPanPicPath(fileupload?.payload?.result);
    } else {
    }
  };

  const PassUploadFunction = async () => {
    if (fileFromClick) {
      var formData = new FormData();
      formData.append("file", fileFromClick[0].originFileObj);
      formData.append("FolderId", 2);
      formData.append("IgnoreTimestamp", true);
      const fileupload = await dispatch(fileUpload(formData));
      SetPassPicPath(fileupload?.payload?.result);
    } else {
    }
  };

  const propspan = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",
    status: "done",

    onChange: (info) => {
      setFileFromClick(info.fileList);
      PanUploadFunction();
    },
    defaultFileList: type === "Update" && updateUid?.clientKyc[0]?.proofDataPath && [
      {
        status: "done",
        url: updateUid?.clientKyc[0]?.proofDataPath,
      },
    ],
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const propsAadhar = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",

    onChange: (info) => {
      setFileFromClick(info.fileList);
      AdharUploadFunction();
    },
    defaultFileList: type === "Update" && updateUid?.clientKyc[1]?.proofDataPath && [
      {
        status: "done",
        url: updateUid?.clientKyc[1]?.proofDataPath,
      },
    ],
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const props = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",

    onChange: (info) => {
      setFileFromClick(info.fileList);
      fileUploadFunction();
    },
    defaultFileList: type === "Update" && updateUid?.profilePic &&  [
      {
        status: "done",
        url: updateUid?.profilePic,
      },
    ],
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const propspass = {
    name: "file",
    maxCount: 1,
    accept: "image/*",
    listType: "picture",

    onChange: (info) => {
      setFileFromClick(info.fileList);
      PassUploadFunction();
    },
    defaultFileList: type === "Update" && updateUid?.clientBankAccount?.passbookImage && [
      {
        status: "done",
        url: updateUid?.clientBankAccount?.passbookImage,
      },
    ],
    showUploadList: {
      showRemoveIcon: false,
    },
  };

  const onFinishFailed = (errorInfo) => {};

  const handlePageClick = (event) => {
    setPageCount(event?.selected + 1);
  };
  const viewHandleOpen = async (id) => {
    // userFromApi.map((item) => {
    //   if (item?.id === id) {
    //     setViewData(item);
    //   }
    // });
    const getDataFromApi = await dispatch(viewDataUser(id));
    setViewData(getDataFromApi?.payload?.result);
    setViewUser(true);
  };
  const viewHandleClose = () => {
    setViewUser(false);
  };

  const handleOpen = async (id) => {
    if (id) {
      const getDataFromApi = await dispatch(viewDataUser(id?.uid));
      setType("Update");
      setUpdateUid(getDataFromApi?.payload?.result);
    } else {
      setType("Add");
      setUpdateUid();
    }
    setAdd(true);
  };

  const normFile = () => {};

  const modalClose = () => {
    setAdd(false);
    setViewData();
  };

  const getUserDataFromApi = async (searchText) => {
    try {  
      const body = `?PageNumber=${pageCount}&PageSize=10&IncludeCount=false`;
      const body2 = {
        searchCriteria: searchText ? searchText : " ",
      };
      const getData = await dispatch(getUserData({ body, body2 }));
      setUserFromApi(getData?.payload?.result);
    } catch (error) {
      ErrorToast("Something went wrong!");
    }
  };

  const switchHandler = async (isActive, id) => {
    if (isActive) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Active this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, active it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const body = {
            userId: id,
          };
          // Swal.fire("Active!", "User has been Active.", "success");
          const getActiveData = dispatch(activeUser(body));
          setTimeout(() => {
            getUserDataFromApi("");
          }, 500);
          SuccessToast("Active user successfully!");
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Deactive this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deactive it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const body = {
            userId: id,
          };
          // Swal.fire("DeActive!", "User has been DeActive.", "success");
          const getDeActiveData = dispatch(deActiveUser(body));
          setTimeout(() => {
            getUserDataFromApi("");
          }, 500);
          SuccessToast("Deactive user successfully!");
        }
      });
    }
  };

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire("Delete!", "User has been Delete.", "success");
        const getDeleteData = dispatch(deleteUserAuth(id));
        setTimeout(() => {
          getUserDataFromApi("");
        }, 1000);
      }
    });
  };

  const abcd = async (id) => {
    const body = {
      userId: id,
    };
    const verifiedUserData = await dispatch(verifiedUser(body));
    if (verifiedUserData?.payload?.response?.data?.isError) {
      ErrorToast(
        verifiedUserData?.payload?.response?.data?.responseException
          ?.exceptionMessage
      );
    } else {
      SuccessToast("verified user successfully!");
      setTimeout(() => {
        getUserDataFromApi("");
      }, 1000);
      setViewUser(false)
    }
  };

  const verifiedUserOnClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be Verified this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Verifie it!",
    }).then((result) => {
      if (result.isConfirmed) {
        abcd(id);
      }
    });
  };

  useEffect(() => {
    getUserDataFromApi("");
  }, [pageCount]);

  const onFinish = async (values) => {
    // if(values?.Password === values?.confirmPassword ){
    if (value?.phoneNumber === "") {
      ErrorToast("Please enter phone number!");
    } else if (value?.countryCallingCodes[0] === undefined) {
      ErrorToast("Please enter phone number code!");
    } else if (values?.Password === values?.confirmPassword) {
      const body = {
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.Email ? values?.Email : "", //optional
        countryCode: value?.countryCallingCodes[0],
        phoneNumber: value?.phoneNumber.replace(/ /g, ""),
        password: values?.Password,
        phoneVerified: true, //pass true, as all numbers are verified by admin.
        profilepic: profilePicPath ? profilePicPath : "", //optional
        // fcmtoken: "", //pass empty for now
        referralCode: values?.referralName ? values?.referralName : null, // pass empty if user didnt enter , else pass entered value
        // isIB: false, // pass false for now
        clientAddress: {
          address: values?.address ? values?.address : null,
          country: values?.country ? values?.country : null,
          city: values?.city ? values?.city : null,
          postalCode: values?.postalCode ? values?.postalCode : null,
        },
        // clientAddress: values?.location ? values?.location : "", // pass null. will add in future
        clientBankAccount:
          values?.bankName ||
          values?.bankHolderName ||
          values?.acNumber ||
          values?.ifscCode ||
          values?.upi ||
          passPicPath
            ? {
                // if user enters value , pass it . else pass null
                bankName: values?.bankName ? values?.bankName : null,
                accountDisplayName: values?.bankHolderName
                  ? values?.bankHolderName
                  : null,
                accountNumber: values?.acNumber ? values?.acNumber : null,
                ifsccode: values?.ifscCode ? values?.ifscCode : null,
                upi: values?.upi ? values?.upi : null,
                passbookImage: passPicPath ? passPicPath : null,
              }
            : null,
        clientKyc:
          adharPicPath || panPicPath
            ? [
                // if user enters value , pass it . else pass null
                // {
                //   proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                //   proofDataPath: profilePicPath,
                // },
                {
                  proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                  proofDataPath: adharPicPath,
                },
                {
                  proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                  proofDataPath: panPicPath,
                },
              ]
            : null,
      };

      const getData = await dispatch(register(body));
      if (getData?.payload?.data?.isError) {
        if (getData?.payload?.data?.responseException?.validationErrors) {
          ErrorToast(
            getData?.payload?.data?.responseException?.validationErrors[0]
              .reason
          );
        } else {
          ErrorToast(
            getData?.payload?.data?.responseException?.exceptionMessage
          );
        }
      } else {
        getUserDataFromApi("");
        setAdd(false);
        SuccessToast("Add user successfully!");
      }
    } else {
      ErrorToast("Passwords are not same ");
    }
  };

  const onFinishUpdate = async (values) => {
    if (values?.Password === values?.confirmPassword) {
      const body = {
        uid: updateUid?.uid,
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.Email ? values?.Email : updateUid?.email, //optional
        countryCode: values?.countryCode,
        phoneNumber: values?.phoneNumber,
        password: values?.Password,
        phoneVerified: true, //pass true, as all numbers are verified by admin.
        profilepic: profilePicPath ? profilePicPath : updateUid?.profilePic, //optional
        // fcmtoken: "", //pass empty for now
        referralCode: values?.referralName
          ? values?.referralName
          : updateUid?.referralCode, // pass empty if user didnt enter , else pass entered value
        // isIB: false, // pass false for now
        clientAddress: {
          address: values?.address ? values?.address : updateUid?.address,
          country: values?.country ? values?.country : updateUid?.country,
          city: values?.city ? values?.city : updateUid?.city,
          postalCode: values?.postalCode
            ? values?.postalCode
            : updateUid?.postalCode,
        },
        // clientAddress: values?.location ? values?.location : "", // pass null. will add in future
        clientBankAccount:
          values?.bankName ||
          values?.bankHolderName ||
          values?.acNumber ||
          values?.ifscCode ||
          values?.upi ||
          passPicPath
            ? {
                // if user enters value , pass it . else pass null
                bankName: values?.bankName
                  ? values?.bankName
                  : updateUid?.clientBankAccount?.bankName,
                accountDisplayName: values?.bankHolderName
                  ? values?.bankHolderName
                  : updateUid?.clientBankAccount?.accountDisplayName,
                accountNumber: values?.acNumber
                  ? values?.acNumber
                  : updateUid?.clientBankAccount?.accountNumber,
                ifsccode: values?.ifscCode
                  ? values?.ifscCode
                  : updateUid?.clientBankAccount?.ifsccode,
                upi: values?.upi
                  ? values?.upi
                  : updateUid?.clientBankAccount?.upi,
                passbookImage: passPicPath
                  ? passPicPath
                  : updateUid?.clientBankAccount?.passbookImage,
              }
            : null,
        clientKyc:
          adharPicPath || panPicPath
            ? [
                // if user enters value , pass it . else pass null
                // {
                //   proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                //   proofDataPath: profilePicPath,
                // },
                {
                  proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                  proofDataPath: adharPicPath
                    ? adharPicPath
                    : updateUid?.clientKyc[0]?.proofDataPath,
                },
                {
                  proofId: 1, // pass Id from proof master list. For ex: if user selects, driving license, pass ProofId - 3
                  proofDataPath: panPicPath
                    ? panPicPath
                    : updateUid?.clientKyc[0]?.proofDataPath,
                },
              ]
            : null,
      };
      const getDataUpdate = await dispatch(updateUser(body));
      getUserDataFromApi();
      if (getDataUpdate?.payload?.data?.isError) {
        if (getDataUpdate?.payload?.data?.responseException?.validationErrors) {
          ErrorToast(
            getDataUpdate?.payload?.data?.responseException?.validationErrors[0]
              .reason
          );
        } else {
          ErrorToast(
            getDataUpdate?.payload?.data?.responseException?.exceptionMessage
          );
        }
      } else {
        getUserDataFromApi("");
        setAdd(false);
        SuccessToast("Update user successfully!");
      }
    } else {
      ErrorToast("Passwords are not same ");
    }
  };

  const onChangeHandler = (data) => {
    setValue(data);
  };

  return (
    <div className="card card-custom gutter-b">
      <div className="card-header">
        <div className="card-title">
          <h3 className="card-label">User List</h3>
        </div>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn text-white"
            onClick={() => handleOpen()}
            style={{
              background:
                " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
            }}
          >
            Add User
          </button>
        </div>
      </div>
      <div className="card-body">
        <Search
          placeholder=" Search..."
          onChange={(e) => {
            const { value } = e?.target;
            getUserDataFromApi(e?.target?.value);
          }}
          enterButton
        />
        <PaginatedItems
          itemsPerPage={10}
          handlePageClick={handlePageClick}
          userFromApi={userFromApi}
          viewHandleOpen={viewHandleOpen}
          switchHandler={switchHandler}
          handleOpen={handleOpen}
          deleteUser={deleteUser}
        />
      </div>
      <Modal
        show={add}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {type} user
          </Modal.Title>
          <Button
            className="btn "
            onClick={modalClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <GrFormClose fontSize="25px" />
          </Button>
        </Modal.Header>
        <Modal.Body className="pb-0 col-lg-12">
          <Form
            name="basic"
            onFinish={type === "Add" ? onFinish : onFinishUpdate}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
            className="row"
          >
            <div className="col-lg-12">
              <h5 className="ml-4">User Details</h5>
              <div className="d-flex flex-wrap mt-5">
                <Form.Item
                  label="First Name"
                  name="firstName"
                  initialValue={updateUid?.firstName}
                  className="col-lg-4"
                  rules={[
                    { required: true, message: "First name is required" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  initialValue={updateUid?.lastName}
                  className="col-lg-4"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="Email"
                  initialValue={updateUid?.email}
                  className="col-lg-4"
                  // rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  label="Phone"
                  name="phoneNumber"
                  initialValue={updateUid?.phoneNumber}
                  className="col-lg-4"
                  rules={[
                    {
                      required: true,
                      message: "Phone is required",
                      min: 10,
                      max: 10,
                    },
                  ]}
                >
                  <Input />
                </Form.Item> */}
                <Grid
                  item
                  className="phone-number-user mb-3 align-items-center col-lg-4 col-md-12"
                >
                  <div style={{ marginBottom: "-7px" }}>
                    <p>Phone Number</p>
                  </div>
                  <IntlTelInput
                    preferredCountries={["IN"]}
                    // defaultCountry={"IN"}
                    // defaultValue={""}
                    defaultValue={`${
                      updateUid?.countryCode
                        ? updateUid?.countryCode + updateUid?.phoneNumber
                        : "+91"
                    }`}
                    onChange={(data) => onChangeHandler(data)}
                  />
                </Grid>
                <Form.Item
                  label="Password"
                  name="Password"
                  initialValue={updateUid?.password}
                  className="col-lg-4"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  initialValue={updateUid?.confirmPassword}
                  className="col-lg-4"
                  rules={[{ required: true, message: "Reenter password" }]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  label="Referral Code"
                  name="referralName"
                  initialValue={
                    updateUid?.referralCode ? updateUid?.referralCode : 8913406
                  }
                  className="col-lg-4"
                  // rules={[
                  //   { required: true, message: "Referral name is required" },
                  // ]}
                >
                  <Input />
                </Form.Item>
                {/* <Form.Item
                  label="Country Code"
                  name="countryCode"
                  initialValue={updateUid?.countryCode}
                  className="col-lg-4"
                  rules={[
                    { required: true, message: "Country code is required" },
                  ]}
                >
                  <Input />
                </Form.Item> */}
              </div>
            </div>
            <div className="col-lg-12">
              <h5 className="ml-4">User Address</h5>
              <div className="d-flex flex-wrap mt-5">
                <Form.Item
                  label="Address"
                  initialValue={updateUid?.clientAddress?.address}
                  name="address"
                  className="col-lg-4"
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Country"
                  name="country"
                  initialValue={updateUid?.clientAddress?.country}
                  className="col-lg-4"
                  rules={[{ required: true, message: "Country is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="City"
                  name="city"
                  initialValue={updateUid?.clientAddress?.city}
                  className="col-lg-4"
                  rules={[{ required: true, message: "City is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Postal Code"
                  name="postalCode"
                  initialValue={updateUid?.clientAddress?.postalCode}
                  className="col-lg-4"
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-12">
              <h5 className="ml-4">Bank Details</h5>
              <div className="d-flex flex-wrap mt-5">
                {/* <Form.Item
                  label="Location"
                  initialValue={updateUid?.clientAddress}
                  name="location"
                  className="col-lg-4"
                >
                  <Input />
                </Form.Item> */}

                <Form.Item
                  label="Bank Holder Name"
                  name="bankHolderName"
                  initialValue={
                    updateUid?.clientBankAccount?.accountDisplayName
                  }
                  className="col-lg-4"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Ac Number"
                  initialValue={updateUid?.clientBankAccount?.accountNumber}
                  name="acNumber"
                  className="col-lg-4"
                  // rules={[{ required: true, message: "Ac number is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="IFSC Code"
                  name="ifscCode"
                  initialValue={updateUid?.clientBankAccount?.ifsccode}
                  className="col-lg-4"
                  // rules={[{ required: true, message: "IFSC Code is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Bank Name"
                  name="bankName"
                  initialValue={updateUid?.clientBankAccount?.bankName}
                  className="col-lg-4"
                  // rules={[{ required: true, message: "Bank name is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="UPI"
                  name="upi"
                  initialValue={updateUid?.clientBankAccount?.upi}
                  className="col-lg-4"
                  // rules={[{ required: true, message: "UPI is required" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Passbook Pic" className="col-lg-12">
                  <Form.Item
                    name="passbookPic"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <Upload.Dragger {...propspass}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-hint">
                        Click or drag file to this area to upload
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </Form.Item>
              </div>
            </div>
            <div className="col-lg-12">
              <h5 className="ml-4 mb-5">Kyc Details</h5>
              <Form.Item label="Pancard Pic" className="col-lg-12">
                <Form.Item
                  name="pancardPic"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  // rules={[
                  //   { required: true, message: "Pancard pic is required" },
                  // ]}
                >
                  <Upload.Dragger {...propspan}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-hint">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
              <Form.Item label="Aadhar Pic" className="col-lg-12">
                <Form.Item
                  name="aadharPic"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  // getValueFromEvent={Adhar}
                  // rules={[
                  //   { required: true, message: "Pancard pic is required" },
                  // ]}
                >
                  <Upload.Dragger {...propsAadhar}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-hint">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>

              <Form.Item label="Profile Pic" className="col-lg-12">
                <Form.Item
                  name="profilePic"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-hint">
                      Click or drag file to this area to upload
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </div>

            <Form.Item className="text-right pt-3 col-lg-12">
              <Button
                style={{
                  background:
                    " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
                }}
                onClick={modalClose}
                className="mr-2"
              >
                Close
              </Button>
              <Button
                style={{
                  background:
                    " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
                }}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <UpdateVideo show={update} onHide={modalClose2} id={updateid} /> */}
      <Modal
        // {...props}
        show={viewUser}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="h3">
            View user
          </Modal.Title>
          <Button
            className="btn "
            onClick={viewHandleClose}
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <GrFormClose fontSize="25px" />
          </Button>
        </Modal.Header>
        <Modal.Body className="col-lg-12">
          <div className="col-lg-12">
            <h4 className="">User Details :-</h4>
            <div class="row mt-5">
              <div className="mt-5 col-lg-6 col-md-6">
                <h6> Profile Pic: </h6>
                <img
                  src={viewData?.profilePic ? viewData?.profilePic : Avatar}
                  height={50}
                  width={50}
                />
              </div>
              <div className="mt-5 col-lg-6 col-md-6">
                <h6> First Name : </h6>
                <p className=""> {viewData?.firstName} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> LastName : </h6>
                <p className=""> {viewData?.lastName} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> Email : </h6>
                <p className=""> {viewData?.email} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6 ">
                <h6>Country Code : </h6>
                <p className=""> {viewData?.countryCode} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6 ">
                <h6>Phone Number : </h6>
                <p className=""> {viewData?.phoneNumber} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6>Referral Name : </h6>
                <p className=""> {viewData?.referralCode} </p>
              </div>
              {/* <div className="mt-3 col-lg-6 col-md-6">
                <h6>Location : </h6>
                <p className=""> {viewData?.Location} </p>
              </div> */}
            </div>
          </div>
          <div className="col-lg-12">
            <h4 className="">User Address :-</h4>
            <div class="row mt-5">
              <div className="mt-5 col-lg-6 col-md-6">
                <h6> Address: </h6>
                <p className=""> {viewData?.clientAddress?.address} </p>
              </div>
              <div className="mt-5 col-lg-6 col-md-6">
                <h6> Country : </h6>
                <p className=""> {viewData?.clientAddress?.country} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> City : </h6>
                <p className=""> {viewData?.clientAddress?.city} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> Postal Code : </h6>
                <p className=""> {viewData?.clientAddress?.postalCode} </p>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <h5 className="mt-5">Bank Details :-</h5>
            <div class="row mt-5">
              <div className="mt-5 col-lg-6 col-md-6">
                <h6> Bank Holder Name : </h6>
                <p className="">
                  {" "}
                  {viewData?.clientBankAccount?.accountDisplayName}{" "}
                </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> Ac Number : </h6>
                <p className="">
                  {" "}
                  {viewData?.clientBankAccount?.accountNumber}{" "}
                </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> IFSC Code : </h6>
                <p className=""> {viewData?.clientBankAccount?.ifsccode} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6>Bank Name : </h6>
                <p className=""> {viewData?.clientBankAccount?.bankName} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6>UPI : </h6>
                <p className=""> {viewData?.clientBankAccount?.upi} </p>
              </div>
              <div className="mt-3 col-lg-6 col-md-6">
                <h6> Passbook Pic : </h6>
                <img
                  src={
                    viewData?.clientBankAccount?.passbookImage
                      ? viewData?.clientBankAccount.passbookImage
                      : Avatar
                  }
                  height={"100%"}
                  width={"50%"}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12 pt-5">
            <h5 className="mt-5">kyc Details :-</h5>
            <div class="row mt-5">
              <div className="mt-5 col-lg-6 col-md-6">
                {/* <h6> Pancard Pic : </h6> */}
                <img
                  src={
                    viewData?.clientKyc[0]
                      ? viewData?.clientKyc[0].proofDataPath
                      : Avatar
                  }
                  height={"100%"}
                  width={"50%"}
                />
              </div>
              <div className="mt-5 col-lg-6 col-md-6">
                {/* <h6> Aadhrcard Pic : </h6> */}
                <img
                  src={
                    viewData?.clientKyc[1]
                      ? viewData?.clientKyc[1].proofDataPath
                      : Avatar
                  }
                  height={"100%"}
                  width={"50%"}
                />
              </div>
            </div>
          </div>
          <Form.Item className="text-right pt-3 col-lg-12 mt-5">
            {!viewData?.isVerified && (
              <Button
                style={{
                  background:
                    " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
                }}
                type="primary"
                htmlType="submit"
                onClick={() => verifiedUserOnClick(viewData?.uid)}
              >
                Verified
              </Button>
            )}
            {/* <Button.
              style={{
                background:
                  " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
              }}
              onClick={modalClose}
              className="mx-2"
            >
              Close
            </Button> */}
          </Form.Item>

          {/* </Form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

// #213B56

export default Users;

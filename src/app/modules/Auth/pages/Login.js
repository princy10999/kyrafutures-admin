import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
// import { Form, Input, Select, Upload } from "antd";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
import { Box, Grid, TextField } from "@material-ui/core";
import { connect, useDispatch } from "react-redux";
import { injectIntl } from "react-intl";
import { login } from "../../../../Redux/Actions/AuthUser";
import IntlTelInput from "react-bootstrap-intl-tel-input";
import * as auth from "../_redux/authRedux";
import { ErrorToast, SuccessToast } from "../../../../helpers/Toast";
import { setToken } from "../../../../Api/clientHelper";
import "react-phone-number-input/style.css";

import { Form, Input, Upload } from "antd";

function Login() {
  const [value, setValue] = useState();
  console.log("value", value);
  const onChangeHandler = (data) => {
    setValue(data);
  };
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const body = {
      phoneNumberCode: value?.countryCallingCodes[0],
      phoneNumber: value?.phoneNumber.replace(/ /g, ""),
      password: values?.password,
    };
    console.log("body", body);
    if (body?.phoneNumber === "") {
      ErrorToast("Please enter phone number!");
    } else if (body?.phoneNumberCode === undefined) {
      ErrorToast("Please enter phone number code!");
    } else {
      const getData = await dispatch(login(body));
      if (getData?.payload?.message) {
        SuccessToast("Login successfully");
        localStorage.setItem(
          "userinfo",
          JSON.stringify(getData?.payload?.result)
        );
        setToken(getData?.payload?.result?.tokenInfo?.token);
        localStorage.setItem(
          "token",
          JSON.stringify(getData?.payload?.result?.tokenInfo)
        );
        localStorage.setItem(
          "access_token",
          getData?.payload?.result?.tokenInfo?.token
        );
        window.location.pathname = "/dashboard";
      }
      // window.location.pathname = "/dashboard";
      window.location.pathname = "/dashboard";
      console.log("getData", getData);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        className="row"
      >
        <div className="col-lg-12">
          <div className="d-flex flex-wrap mt-5">
            <p className="ml-4">Phone Number</p>
            <Grid container spacing={2}>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                className="phone-number col-lg-12 col-md-12 col-sm-12"
                style={{ padding: "10px" }}
              >
                <IntlTelInput
                  preferredCountries={["IN"]}
                  defaultCountry={"IN"}
                  defaultValue={""}
                  onChange={(data) => onChangeHandler(data)}
                />
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                className="password p-0 m-0 col-lg-12 col-md-12 col-sm-12"
              >
                <Form.Item
                  label="Password"
                  name="password"
                  className="col-lg-12 col-md-12 col-sm-12 m-0"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Grid>
            </Grid>
          </div>
        </div>

        <Form.Item className="text-right pt-3 col-lg-12 mt-3">
          <Button
            style={{
              background:
                " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
            }}
            type="primary"
            htmlType="submit"
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default injectIntl(connect(null, auth.actions)(Login));

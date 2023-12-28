/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, {useState, useEffect} from "react";
import SVG from "react-inlinesvg";
import { useHistory } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_helpers";

export function QuickUser() {
  const [userData, setuserData] = useState({})
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("userinfo")){
      setuserData(JSON.parse(localStorage.getItem("userinfo")));
    }
  }, [])
  console.log("userData", userData);


  const logoutClick = () => {
    const toggle = document.getElementById("kt_quick_user_toggle");
    if (toggle) {
      toggle.click();
    }
    localStorage.clear()
    window.location.pathname = "/logout"
  };

  return (
    <div
      id="kt_quick_user"
      className="offcanvas offcanvas-right offcanvas p-10"
    >
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">Admin Profile</h3>
        <a
          href="#"
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close"
        >
          <i className="ki ki-close icon-xs text-muted" />
        </a>
      </div>

      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                  "/media/users/300_21.jpg"
                )})`,
              }}
            />
            <i className="symbol-badge bg-success" />
          </div>
          <div className="d-flex flex-column">
            <a
              href="#"
              className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {userData?.firstName}
            </a>
            {/* <div className="text-muted mt-1">{userData?.firstName}</div> */}
            <div className="navi mt-2">
              <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Communication/Mail-notification.svg"
                        )}
                      ></SVG>
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary">
                    {userData?.email}
                  </span>
                </span>
              </a>
            </div>
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button
              className="btn btn-bold text-white"
              onClick={logoutClick}
              style={{background: ' linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)'}}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

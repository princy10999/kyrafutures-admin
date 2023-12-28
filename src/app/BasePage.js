import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import Categoty from "./pages/Categoty";
import Course from "./pages/Users";
import { DashboardPage } from "./pages/DashboardPage";
import Episodes from "./pages/Episodes";
import Explore from "./pages/Explore";
import ExploreCourse from "./pages/ExploreCourse";
import Feature from "./pages/Feature";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Support from "./pages/Support";
import TermsCondition from "./pages/TermsCondition";
import Time from "./pages/Time";
import Usera from "./pages/Usera";
import Notification from "./pages/Notification";
import Users from "./pages/Users";

export default function BasePage() {
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        <ContentRoute path="/dashboard" component={DashboardPage} />
        <ContentRoute path="/users" component={Users} />

        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}

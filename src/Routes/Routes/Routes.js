import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main";
import BillingList from "../../Pages/BillingList/BillingList";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import SignUp from "../../Pages/SignUp/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/billing-list",
        element: <BillingList></BillingList>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="max-w-screen-2xl mx-auto my-10">
        <p>Something Went Wrong</p>
      </div>
    ),
  },
]);

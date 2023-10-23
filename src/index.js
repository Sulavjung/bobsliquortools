import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter} from "react-router-dom";
import RegisterClosing from "./components/register";
import MenuBar from "./routes/root";
import ErrorPage from "./routes/error-page";
import RealestateValuation from "./components/realestatevaluation";
import PriceCalculator from "./components/priceCalculator";
import SalesForm from "./components/monthlyReportForm";
import Login from "./components/pages/login";
import Datepicker from "./components/partials/datepicker";



const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuBar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RegisterClosing />,

      },
      {
        path: "sales",
        element: <SalesForm />,
      },
      {
        path: "price",
        element: <PriceCalculator />,
      },
      {
        path: "restate",
        element: <RealestateValuation />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  }
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

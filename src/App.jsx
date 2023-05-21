import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ConversionHistory from "../src/Pages/ConversionHistory/ConversionHistory";
import Conversion from "./Components/Conversion/Conversion";
import CustomLayout from "./Components/Layout/CustomLayout";
import { conversionBackProps, conversionForwardProps } from "./constants";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomLayout children={<Outlet />} />}>
          <Route
            path="longconversion"
            element={
              <Conversion {...conversionForwardProps}
              />
            }
          ></Route>
          <Route
            path="shortconversion"
            element={
              <Conversion {...conversionBackProps}
              />
            }
          ></Route>
          <Route path="history" element={<ConversionHistory />}></Route>
          <Route
            path="*"
            element={<Navigate to={"longconversion"} replace />}
          />
        </Route>
        <Route path="*" element={<Navigate to={"/longconversion"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

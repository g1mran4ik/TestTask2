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
import useStorage from "./hooks/useStorage";

import "./App.css";

export default function App() {
  const [history, setHistory] = useStorage("history");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomLayout children={<Outlet />} />}>
          <Route
            index
            element={<Navigate to={"/longconversion"} replace />}
          ></Route>
          <Route
            path="longconversion"
            element={
              <Conversion {...conversionForwardProps} setHistory={setHistory} />
            }
          ></Route>
          <Route
            path="shortconversion"
            element={
              <Conversion {...conversionBackProps} setHistory={setHistory} />
            }
          ></Route>
          <Route
            path="history"
            element={
              <ConversionHistory history={history} setHistory={setHistory} />
            }
          ></Route>
        </Route>
        <Route
          path="*"
          element={<Navigate to={"/longconversion"} replace />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

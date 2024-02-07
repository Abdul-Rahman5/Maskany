import slugify from "slugify";
import Map from "./Pages/Website/Map";
import Login from "./Pages/Auth/Login";
import Home from "./Pages/Website/Home";
// import Help from "./Pages/Website/Help";
import OTP from "./Pages/Auth/OTPSystem";
import Search from "./Pages/Website/Search";
import Err404 from "./Pages/Auth/Errors/404";
import Register from "./Pages/Auth/Register";
import { Route, Routes } from "react-router-dom";
import RequireBack from "./Pages/Auth/RequireBack";
import ResetPassword from "./Pages/Auth/ResetPassword";
import LoadingSubmit from "./Components/Loading/Loading";
import UserSettings from "./Pages/Website/User/UserSettings";
import ProperyDetails from "./Pages/Website/PropertyDetails";
import UserFavourites from "./Pages/Website/User/UserFavourite";
import SearchResult from "./Pages/Website/SearchResult";
import Support from "./Pages/Website/Support";
// import MapDetails from "./Pages/Website/MapDetails";
import Packages from "./Pages/Website/Packages";
// import Terms from './Pages/Website/Terms';
import OtpPhone from "./Pages/Auth/OtpPhone";
import Confirm from "./Pages/Website/Confirm";
import PaymentCompleted from "./Pages/Website/PaymentCompleted";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/maskany" element={<Home />} />
        <Route path="/Support" element={<Support />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/map" element={<Map />} />
        <Route path="/search" element={<Search />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/PaymentCompleted" element={<PaymentCompleted />} />
        {/* <Route path="/terms" element={<Terms/>} /> */}
        <Route path="/search/result" element={<SearchResult />} />
        <Route path="/settings" element={<UserSettings />} />
        {/* <Route path="/mapDetails/:id/" element={<MapDetails />} /> */}
        <Route path="/favourites" element={<UserFavourites />} />
        <Route path="/property/:id" element={<ProperyDetails />} />
        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/otpPhone" element={<OtpPhone />} />
          <Route path="/register" element={<Register />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
        </Route>
        <Route path="/*" element={<Err404 />} />
        <Route path="/test" element={<LoadingSubmit />} />
      </Routes>
    </div>
  );
}

export default App;

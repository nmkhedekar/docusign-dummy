import { Routes, Route } from "react-router-dom";
import HomeRoute from "../Compenents/Pages/HomeRoute";
import SignUp from "../Compenents/Pages/Auth/Signup";
import Login from "../Compenents/Pages/Auth/Login";
import ContactUs from "../Compenents/Pages/ContactUs";
import Dashboard from "../Compenents/Pages/User/Dashboard";
import VerifyUser from "../Compenents/Pages/Auth/VerifyUser";
import ForgotPWD from "../Compenents/Pages/Auth/ForgotPWD";
import ResetPWD from "../Compenents/Pages/Auth/ResetPWD";

const Main = () => (
    <div class="wrapper">
        <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<ForgotPWD />} />
            <Route path="/verify-email" element={<VerifyUser />} />
            <Route path="/reset-password" element={<ResetPWD />} />
            <Route path="/contactUs" element={<ContactUs />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </div>
)

export default Main;
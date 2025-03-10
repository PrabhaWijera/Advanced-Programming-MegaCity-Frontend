import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import CarListing from "../pages/CarListing";
import CarDetails from "../pages/CarDetails";
import Blog from "../pages/Blog";
import BlogDetails from "../pages/BlogDetails";
import NotFound from "../pages/NotFound";
import Contact from "../pages/Contact";
import AdminDashboard from "../components/admins/AdminDashboard.jsx";
import AdminServiceHelp from "../components/admins/adminpages/AdminServiceHelp.jsx";
import AdminProfile from "../components/admins/adminpages/AdminProfile.jsx";
import DriverAssignBooking from "../components/Driver/DriverAssignBooking.jsx";
import Profile from "../components/UI/Profile.jsx";
import Logout from "../components/UI/Logout.jsx";
import Login from "../components/login/Login.jsx";
import Register from "../components/Register/Register.jsx";
import CarForm from "../components/admins/serives/CarandImage.jsx";
import UserList from "../components/admins/adminpages/UserList.jsx";
import BookingManage from "../components/admins/serives/BookingManage.jsx";
import Payment from "../components/admins/serives/Payment.jsx";
import QRCodeScanner from "../components/admins/adminpages/QRCodeScanner.jsx";
import DriverDash from "../components/Driver/DriverDash.jsx";
import UserManual from "../components/UI/UserManual.jsx";


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />

      <Route path="/about" element={<About />} />
      <Route path="/cars" element={<CarListing />} />
      <Route path="/cars/:slug" element={<CarDetails />} />
      <Route path="/blogs" element={<Blog />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/userMn" element={<UserManual />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="/profile" element={<Profile />} />



        <Route path="/driver" element={<DriverDash/>} />
        <Route path="/assinBooking" element={<DriverAssignBooking />} />




        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-faq" element={<AdminServiceHelp />} />
        <Route path="/admin-profile" element={<AdminProfile />} />
        <Route path="/admin-user" element={<UserList />} />
        <Route path="/sacnnedQR" element={<QRCodeScanner />} />
        <Route path="/booking" element={<BookingManage />} />
        <Route path="/carswithimages" element={<CarForm />} />
        <Route path="/Payments" element={<Payment />} />
    </Routes>
  );
};

export default Routers;
